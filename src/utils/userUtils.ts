export const createUsername = (givenName: string, surname: string, email: string): string => {
  try {
    const studentCode = extractStudentCode(email);
    return `${givenName} (${studentCode})`;
  } catch (e) {
    return `${givenName} ${surname}`;
  }
};

const extractStudentCode = (email: string) => {
  const match = email.match(/^x(\d+)@/);

  if (match) {
    return match[1];
  } else {
    throw new Error('Invalid email format');
  }
};
