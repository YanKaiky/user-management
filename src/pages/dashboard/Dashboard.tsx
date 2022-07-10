import { FC } from 'react';
import { Toolbar } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard: FC = () => {
  return (
    <BaseLayout title='Home Page' toolbar={<Toolbar showInput />}>
      Testing
    </BaseLayout>
  );
};
