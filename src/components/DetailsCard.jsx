const DetailsCard = ({ name, id }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-dim text-lg">{name}</p>
      <p className="text-white text-lg" id={id}></p>
    </div>
  );
};

export default DetailsCard;
