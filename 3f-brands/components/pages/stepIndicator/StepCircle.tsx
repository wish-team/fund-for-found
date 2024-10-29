import { Divider } from "@nextui-org/react";

interface StepCircleProps {
  isActive: boolean;
  index: number;
}

const StepCircle: React.FC<StepCircleProps> = ({ isActive, index }) => {
  return (
    <section
      className={`w-10 relative h-10 rounded-full text-lg flex items-center justify-center mt-8 mx-auto md:mx-4 lg:mx-8 ${
        isActive ? "bg-primary text-white" : "bg-light4 text-light1"
      }`}
    >
      {index}
    </section>
  );
};

export default StepCircle;
