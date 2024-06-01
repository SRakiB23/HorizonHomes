function ReviewCard({ review }) {
  const { reviewer_name, reviewer_image, review_description, property_title } =
    review;

  return (
    <div className="">
      <div className="p-4 border rounded-lg bg-white shadow-md text-center md:h-96 sm: h-[600px]">
        <img
          src={reviewer_image}
          alt="image"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-bold">{reviewer_name}</h3>
        <h4 className="text-lg font-semibold text-gray-600">
          {property_title}
        </h4>
        <p className="text-gray-500 mt-2">{review_description}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
