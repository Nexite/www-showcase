import React from 'react';
import { signIn } from 'next-auth/client';
import Content from '@codeday/topo/Molecule/Content';
import Button from '@codeday/topo/Atom/Button';
import Page from './Page';

export default function ForceLoginPage() {
  return (
    <Page slug="/">
      <Content>
        <Button onClick={() => signIn('auth0')}>Log In With CodeDay Account</Button>
      </Content>
    </Page>
  );
}
