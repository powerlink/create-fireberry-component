const designLibraryStories = `
  import { ComponentStory, ComponentMeta } from '@storybook/react';
  import NAME from './NAME';

  export default {
    title: 'Atomic/NAME',
    component: NAME,
  } as ComponentMeta<typeof NAME>;

  const Template: ComponentStory<typeof NAME> = (args) => <NAME {...args} />;

  export const Primary = Template.bind({});
  Primary.args = {
  };  
`;

module.exports = { designLibraryStories };
