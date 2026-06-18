package com.example.provider;

import org.keycloak.authentication.Authenticator;
import org.keycloak.authentication.AuthenticatorFactory;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.provider.ProviderConfigProperty;

import java.util.List;

public class CustomAuthenticatorFactory
        implements AuthenticatorFactory {

    public static final String ID = "custom-authenticator";

    @Override
    public Authenticator create(
            KeycloakSession session) {

        return new CustomAuthenticator();
    }

    @Override
    public String getId() {
        return ID;
    }

    @Override
    public String getDisplayType() {
        return "Custom Authenticator";
    }

    @Override
    public String getHelpText() {
        return "Custom Login Authenticator";
    }

    @Override
    public List<ProviderConfigProperty> getConfigProperties() {
        return List.of();
    }

    @Override
    public boolean isConfigurable() {
        return false;
    }

    @Override
    public void init(
        org.keycloak.Config.Scope config
    ) {
    }

    @Override
    public void postInit(
        KeycloakSessionFactory factory
    ) {
    }

    @Override
    public void close() {
    }

    @Override
    public String getReferenceCategory() {
        return null;
    }

    @Override
    public boolean isUserSetupAllowed() {
        return false;
    }

    @Override
    public Requirement[] getRequirementChoices() {
        return REQUIREMENT_CHOICES;
    }
}