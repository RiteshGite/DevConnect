const UserCard = ({ user }) => {
  if (!user) return null;

  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    photoUrl,
    skills = [],
  } = user;

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      {/* Image */}
      <figure className="h-56">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Body */}
      <div className="card-body">
        {/* Name */}
        <h2 className="card-title">
          {firstName} {lastName}
          <div className="badge badge-secondary">{age}</div>
        </h2>

        {/* Gender */}
        <p className="text-sm capitalize text-gray-300">{gender}</p>

        {/* About */}
        <p className="text-sm text-gray-300">{about}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {Array.isArray(skills) &&
            skills.map((skill, index) => (
              <span key={index} className="badge badge-outline">
                {skill}
              </span>
            ))}
        </div>

        {/* Actions */}
        <div className="card-actions justify-between pt-4">
          <button className="btn btn-error btn-sm">Ignore</button>
          <button className="btn btn-primary btn-sm">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
