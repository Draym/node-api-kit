enum ErrorCode {
    SERVICE_Closed = 403000,
    SERVICE_PROVIDER_ApiError = 4000001,
    NOT_IMPLEMENTED = 403003,
    NOT_FOUND_User = 404004,
    NOT_FOUND_Role = 404005,
    NOT_FOUND_RefreshToken = 404006,
    NOT_FOUND_Application = 404007,
    NOT_FOUND_ApplicationScope = 404008,
    NOT_FOUND_ApplicationUser = 404009,
    REQUIRE_Token = 400010,
    REQUIRE_Role = 403011,
    REQUIRE_Whitelist = 403012,
    REQUIRE_Access = 403013,
    REQUIRE_Ownership = 403014,
    REQUIRE_ApiKey = 400015,
    REQUIRE_APP_Scope = 403016,
    REQUIRE_APP_TypeAccess = 403017,
    REQUIRE_APP_AccessRequire = 403018,
    INVALID_Token = 400019,
    INVALID_Parameter = 400020,
    INVALID_ApiKey = 400021,
    EXPIRED_Token = 400022,
    MISSING_Parameter = 404023,
    MISSING_Filter = 404024,
    RESTRICTED_Login = 403025,
    REJECTED_Token = 403026,
    REJECTED_ApiKey = 403027
}


export default ErrorCode