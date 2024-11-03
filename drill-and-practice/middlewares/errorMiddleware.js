export const errorMiddleware = async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);
    }
  };
  