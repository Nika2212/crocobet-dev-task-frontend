import { ErrorCodes } from '../../core/enums/error-codes';

export class BaseResponse<T> {
  public IsSuccess: boolean;
  public ErrorCode: ErrorCodes;
  public Data: T;
}
