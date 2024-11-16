import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";
import { checkAnswer, reciveRandomQuestion } from "../../routes/apis/questionApi.js";


const testData = {
  mockAnswer: null,
  mockQuestion: {
    questionId: 1,
    options: [
      { id: 1, option_text: "Option 1", is_correct: true },
      { id: 2, option_text: "Option 2", is_correct: true },
    ],
  },
  mockRequest: {
    body: () => ({
      value: Promise.resolve(testData.mockAnswer),
    }),
  },
  mockResponse: { body: {}, status: 200 },
  mockService: {
    getQuestionWithOptionsById: async () => (testData.mockQuestion),
  },
};

Deno.test('checkAnswer return {correct: true} when answer is right.', async () => {
  testData.mockAnswer = { questionId: 1, optionsIds: [1, 2] };

  await checkAnswer(
    { request: testData.mockRequest, response: testData.mockResponse },
    testData.mockService
  );

  assertEquals(testData.mockResponse.body, { correct: true });
});

Deno.test('checkAnswer return {correct: false} when answer is wrong.', async () => {
  testData.mockAnswer = { questionId: 1, optionsIds: [2] };;

  await checkAnswer(
    { request: testData.mockRequest, response: testData.mockResponse },
    testData.mockService
  );
  
  assertEquals(testData.mockResponse.body, { correct: false });
});

Deno.test('checkAnswer return status 400 for invalid answer object.', async () => {
  testData.mockAnswer = {};

  await checkAnswer(
    { request: testData.mockRequest, response: testData.mockResponse }, 
    testData.mockService
  );

  assertEquals(testData.mockResponse.status, 400);
});

Deno.test('reciveRandomQuestion return a formatted random question', async () => {
  const randomQueastionText = `qText: ${Math.random()}`;
  const randomOptions = [
    `optText: ${Math.random()}`, 
    `optText: ${Math.random()}`, 
    `optText: ${Math.random()}`
  ];
  const mochQuestion = {
    questionid: 1,
    questiontext: randomQueastionText,
    answeroptions: [
      { optionId: 1, optionText: randomOptions[0] },
      { optionId: 2, optionText: randomOptions[1] },
      { optionId: 3, optionText: randomOptions[2] }
    ]
  };
  const mockService = {
    getRandomQuestion: async () => (mochQuestion),
  };

  await reciveRandomQuestion({ response: testData.mockResponse }, mockService);
  
  assertEquals(testData.mockResponse.body, {
    questionId: 1,
    questionText: randomQueastionText,
    answerOptions: [
      { optionId: 1, optionText: randomOptions[0] },
      { optionId: 2, optionText: randomOptions[1] },
      { optionId: 3, optionText: randomOptions[2] }
    ]
  });
});

Deno.test('reciveRandomQuestion return an empty object when no question is found.', async () => {
  const mockService = {
    getRandomQuestion: async () => null,
  };

  await reciveRandomQuestion({ response: testData.mockResponse }, mockService);

  assertEquals(testData.mockResponse.body, {});
});
