import { FC } from 'react';
import { ToolbarList } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard: FC = () => {
  return (
    <BaseLayout title='Home Page' toolbar={<ToolbarList showInput />}>
      Testing
    </BaseLayout>
  );
};
