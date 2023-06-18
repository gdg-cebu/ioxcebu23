import { getComponent } from '../registry';

const DynamicSection = ({ section, ...props }) => {
  const SectionComponent = getComponent(section.type);
  if (!SectionComponent) {
    throw new Error(`Unknown section: ${section.type}`);
  }
  return <SectionComponent {...section} {...props} />;
};

export default DynamicSection;
