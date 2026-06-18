<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false displayMessage=true; section>
<#if section = "form">
<div class="split-login">

    <!-- LEFT PANEL -->
    <div class="split-login__brand">
        <div class="split-login__brand-top">
            <svg class="split-login__logo" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 18 L9 6 L16 16 L23 4 L30 18" stroke="white" stroke-width="3"
                      fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="6" r="2" fill="white"/>
            </svg>
        </div>

        <div class="split-login__brand-mid">
            <h1 class="split-login__title">Hi, Welcome back</h1>
            <p class="split-login__subtitle">OPTIMA PROCUR-TO-PAY</p>
        </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="split-login__form-panel">

        <div class="split-login__topbar">
            <a href="#" class="split-login__help">Need help?</a>
            <span class="split-login__settings" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
            </span>
        </div>

        <div class="split-login__form-wrap">

            <h2 class="split-login__heading">Sign in to your account</h2>

            <p class="split-login__register-hint">
                Don&rsquo;t have an account?
                <#if realm.registrationAllowed && !registrationDisabled??>
                    <a href="${url.registrationUrl}" class="split-login__link">Get started</a>
                <#else>
                    <span class="split-login__link">Get started</span>
                </#if>
            </p>

            <form id="kc-form-login" class="split-login__form" action="${url.loginAction}" method="post">

                <div class="split-login__field">
                    <label for="username" class="split-login__label">Email address</label>
                    <input
                        tabindex="1"
                        id="username"
                        class="split-login__input"
                        name="username"
                        type="text"
                        autofocus
                        autocomplete="email"
                        value="${(login.username!'')}"
                    />
                </div>

                <div class="split-login__field">
                    <div class="split-login__label-row">
                        <label for="password" class="split-login__label">Password</label>
                        <#if realm.resetPasswordAllowed>
                            <a tabindex="5" href="${url.loginResetCredentialsUrl}" class="split-login__forgot">
                                Forgot password?
                            </a>
                        </#if>
                    </div>

                    <div class="split-login__password-wrap">
                        <input
                            tabindex="2"
                            id="password"
                            class="split-login__input"
                            name="password"
                            type="password"
                            placeholder="6+ characters"
                            autocomplete="current-password"
                        />
                        <button
                            class="split-login__eye"
                            type="button"
                            aria-label="Show password"
                            onclick="splitLoginTogglePassword()"
                        >
                            <svg id="split-login__eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8">
                                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <input type="hidden" id="id-hidden-input" name="credentialId"
                       <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>

                <div class="split-login__submit-wrap">
                    <input
                        tabindex="4"
                        class="split-login__submit"
                        name="login"
                        id="kc-login"
                        type="submit"
                        value="Sign in"
                    />
                </div>

            </form>
        </div>
    </div>
</div>

<script>
    function splitLoginTogglePassword() {
        var input = document.getElementById('password');
        var isHidden = input.type === 'password';
        input.type = isHidden ? 'text' : 'password';
    }
</script>

</#if>
</@layout.registrationLayout>
