import { FC } from 'react';
import { ToolbarDetails } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/people/people.service';

export const Dashboard: FC = () => {
  (async () => {
    const data = await PeopleService.getAllPeople();

    console.log(data);
  })();

  return (
    <BaseLayout title='Home Page' toolbar={<ToolbarDetails showSaveAndBackButton showNewButton />}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quae, voluptatibus! Eligendi quaerat distinctio, sapiente, animi magnam sed mollitia nihil eum impedit,
      adipisci amet enim obcaecati commodi exercitationem reprehenderit. Officia, velit.
    </BaseLayout>
  );
};
