const DetailsCard = ({ name, unit, value }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-dim text-lg">{name}</p>
      <p className="text-white text-lg">
        {value}
        {unit || ""}
      </p>
    </div>
  );
};

export default DetailsCard;
