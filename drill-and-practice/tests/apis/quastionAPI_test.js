import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";
import { describe, it} from "https://deno.land/std/testing/bdd.ts";
import { checkAnswer, reciveRandomQuestion } from "../../routes/apis/questionApi.js";


describe('TEST API - questionApi', async () => {
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
      getQuestionWithOptionsById: () => (testData.mockQuestion),
    },
  };
  
  describe('POST /api/questions/answer - questionApi.checkAnswer', async () => {
    it('checkAnswer return {correct: true} when answer is right.', async () => {
      testData.mockAnswer = { questionId: 1, optionsIds: [1, 2] };
    
      await checkAnswer(
        { request: testData.mockRequest, response: testData.mockResponse },
        undefined,
        testData.mockService
      );
    
      assertEquals(testData.mockResponse.body, { correct: true });
    });
    
    it('checkAnswer return {correct: false} when answer is wrong.', async () => {
      testData.mockAnswer = { questionId: 1, optionsIds: [2] };;
    
      await checkAnswer(
        { request: testData.mockRequest, response: testData.mockResponse },
        undefined,
        testData.mockService
      );
      
      assertEquals(testData.mockResponse.body, { correct: false });
    });
    
    it('checkAnswer return status 400 for invalid answer object.', async () => {
      testData.mockAnswer = {};
    
      await checkAnswer(
        { request: testData.mockRequest, response: testData.mockResponse }, 
        undefined,
        testData.mockService
      );
    
      assertEquals(testData.mockResponse.status, 400);
    });
  });
  
  describe('GET /api/questions/random - questionApi.reciveRandomQuestion', async () => {
    it('reciveRandomQuestion return a formatted random question', async () => {
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
        getRandomQuestion: () => (mochQuestion),
      };
    
      await reciveRandomQuestion({ response: testData.mockResponse }, undefined, mockService);
      
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
    
    it('reciveRandomQuestion return an empty object when no question is found.', async () => {
      const mockService = {
        getRandomQuestion: () => null,
      };
    
      await reciveRandomQuestion({ response: testData.mockResponse }, undefined, mockService);
    
      assertEquals(testData.mockResponse.body, {});
    });
  });
});
