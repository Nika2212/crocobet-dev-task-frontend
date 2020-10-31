export function getErrorMessage(code: number): string {
  switch (code) {
    case 1000: return 'Error on server.';
    case 1001: return 'Invalid registration credentials.';
    case 1002: return 'Invalid authorization credentials.';
    case 1003: return 'Username already exists..';
    case 1004: return 'Invalid username/password.';
    case 1005: return 'Invalid username/password.';
    case 1006: return 'Invalid form data.';
    case 1007: return 'Invalid form data.';
    case 1008: return 'Invalid form data.';
    case 1009: return 'Todo not found.';
    case 1010: return 'Invalid assigned user id.';
    case 1011: return 'Such user does not exist.';

    default: return code.toString(10);
  }
}
