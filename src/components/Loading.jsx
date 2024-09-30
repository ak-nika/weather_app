const Loading = ({ location }) => {
  return (
    <div className="w-full h-screen fixed top-0 bg-footer flex flex-col justify-center items-center gap-2">
      <div className="border-white border-4 border-t-0 border-b-0 rounded-full w-20 h-20 animate-spin"></div>
      <h1 className="text-white font-bold text-xl">
        Loading{location ? ` ${location}` : ""}...
      </h1>
    </div>
  );
};

export default Loading;
