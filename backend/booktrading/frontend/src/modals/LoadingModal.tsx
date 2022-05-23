import { SpinnerCircular } from "spinners-react";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex">
      <SpinnerCircular color="rgb(59 130 246 / 1)" className="mx-auto" />
    </div>
  );
};

export default LoadingModal;
