const getEnvironmentVariable = (apiKey: string): string => {
  const unvalidatedEnvironmentVariable = process.env.NEXT_PUBLIC_API_KEY;
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(`Couldn't find environment variable: ${apiKey}`);
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  apiKey: getEnvironmentVariable("API_KEY"),
};
