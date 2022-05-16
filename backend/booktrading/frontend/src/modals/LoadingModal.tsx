const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex">
      <div className="bg-white m-auto w-64 h-64 rounded-md">
        <div className="m-auto">Loading</div>
      </div>
    </div>
  );
};

export default LoadingModal;
