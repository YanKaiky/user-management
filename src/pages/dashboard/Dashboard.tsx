import { FC } from 'react';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard: FC = () => {
  return (
    <BaseLayout title='Home Page' toolbar={<>Toolbar</>}>
      Testing
    </BaseLayout>
  );
};
