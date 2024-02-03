export class UserRequest {
  private static isAdmin: boolean = false;
  private static isCustomer: boolean = false;
  private static lang: string = 'ar';
  static setLang(langRequest: string) {
    UserRequest.lang = langRequest;
  }
  static getLang(): string {
    return UserRequest.lang;
  }

  static setIsAdminTrue() {
    UserRequest.isAdmin = true;
  }
  static getIsAdmin(): boolean {
    return UserRequest.isAdmin;
  }

  static setIsCustomerTrue() {
    UserRequest.isCustomer = true;
  }
  static getIsCustomer(): boolean {
    return UserRequest.isCustomer;
  }
}
