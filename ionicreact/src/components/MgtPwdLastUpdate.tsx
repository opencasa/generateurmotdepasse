import React from 'react';
import { Get, MgtTemplateProps } from '@microsoft/mgt-react';
const MgtPwdLastUpdate: React.FC = () => {
  const MyPwdLastChange = (props: MgtTemplateProps) => {
    const dt = props.dataContext.value;
    const pwdDate = new Date(dt);
    //console.log(`MyPwdLastChange: ${pwdDate.toLocaleDateString()}`);
    const diff = Math.abs(new Date().getTime() - pwdDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    return <div>Age mot de passe:  {diffDays} jours (changé le {pwdDate.toLocaleDateString()})</div>;
  };

  return (
    <Get resource="me/lastPasswordChangeDateTime" scopes={['user.read']}>
      <MyPwdLastChange />
    </Get>
  );
};

export default MgtPwdLastUpdate;
