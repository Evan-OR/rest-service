import { createUsername } from '../src/utils/userUtils';

describe('createUsername', () => {
  it('should return username with student code for valid student email', () => {
    const username = createUsername('John', 'Doe', 'x21357913@student.ncirl.ie');
    expect(username).toBe('John (21357913)');
  });

  it('should return full name when email does not start with x followed by digits', () => {
    const username = createUsername('Alice', 'Smith', 'alice@example.com');
    expect(username).toBe('Alice Smith');
  });

  it('should return full name for email missing student code format', () => {
    const username = createUsername('Bob', 'Brown', '21357913@student.ncirl.ie');
    expect(username).toBe('Bob Brown');
  });

  it('should handle email with capital X (case sensitive)', () => {
    const username = createUsername('Eve', 'White', 'X21357913@student.ncirl.ie');
    expect(username).toBe('Eve White');
  });

  it('should work with minimal valid student email', () => {
    const username = createUsername('Tom', 'Lee', 'x1@ncirl.ie');
    expect(username).toBe('Tom (1)');
  });

  it('should return full name if email is completely malformed', () => {
    const username = createUsername('Jane', 'Roe', 'notanemail');
    expect(username).toBe('Jane Roe');
  });

  it('should throw and fall back if email is empty', () => {
    const username = createUsername('Sam', 'Blue', '');
    expect(username).toBe('Sam Blue');
  });

  it('should return full name if email only contains domain', () => {
    const username = createUsername('Mark', 'Green', '@student.ncirl.ie');
    expect(username).toBe('Mark Green');
  });

  it('should return full name if email is missing @ symbol', () => {
    const username = createUsername('Kate', 'Black', 'x21357913student.ncirl.ie');
    expect(username).toBe('Kate Black');
  });

  it('should strip student code correctly even if there are numbers in domain', () => {
    const username = createUsername('Leo', 'Gray', 'x99999@123domain.ie');
    expect(username).toBe('Leo (99999)');
  });
});
