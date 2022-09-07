import { FC } from 'react';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard: FC = () => {
  return (
    <BaseLayout icon='home' title='Home Page' toolbar={<ToolbarDetails showSaveAndBackButton showNewButton />}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quae, voluptatibus! Eligendi quaerat distinctio, sapiente, animi magnam sed mollitia nihil eum impedit,
      adipisci amet enim obcaecati commodi exercitationem reprehenderit. Officia, velit.
    </BaseLayout>
  );
};
