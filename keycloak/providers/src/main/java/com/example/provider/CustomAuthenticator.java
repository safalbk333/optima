package com.example.provider;

import jakarta.ws.rs.core.Response;

import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.Authenticator;
import org.keycloak.models.UserModel;

public class CustomAuthenticator implements Authenticator {

    @Override
    public void authenticate(AuthenticationFlowContext context) {

        UserModel user = context.getUser();

        if(user != null){
            context.success();
            return;
        }

        Response challenge =
            context.form()
                   .createForm("login.ftl");

        context.challenge(challenge);
    }

    @Override
    public void action(AuthenticationFlowContext context) {
        context.success();
    }

    @Override
    public boolean requiresUser() {
        return false;
    }

    @Override
    public boolean configuredFor(
        org.keycloak.models.KeycloakSession session,
        org.keycloak.models.RealmModel realm,
        UserModel user
    ) {
        return true;
    }

    @Override
    public void setRequiredActions(
        org.keycloak.models.KeycloakSession session,
        org.keycloak.models.RealmModel realm,
        UserModel user
    ) {
    }

    @Override
    public void close() {
    }
}