import Image from './Image';
import { Link, useHistory } from 'react-router-dom';

var mon = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const PostCard = ({
  post,
  showUpdateButton = false,
  showDeleteButton = false,
  handleDelete = (f) => f,
}) => {
  const history = useHistory();

  const { title, image, postedBy, updatedAt, content } = post;

  return (
    <div
      className="card p-3  m-2 hover-shadow bg-post "
      style={{ height: '95%' }}
    >
      <div class="card-body text-start">
        <Link to={`/post/${post._id}`}>
          <h5 class="card-title text-dark fs-4 ps-2 lh-sm">
            <small>
              <i class="fas fa-quote-left text-primary"></i>{' '}
            </small>
            {title}
          </h5>
        </Link>
        <Image image={image} />
        <p className="fw-bold ps-2 pt-3 fw-light">
          {content.substr(0, 50)}...
          <small className="fw-bold">
            <Link to={`/post/${post._id}`} className="text-info">
              {' '}
              Read more
            </Link>
          </small>
        </p>
      </div>
      <div class="card-footer">
        <small className="float-start" style={{ color: '#78909C' }}>
          <i class="fas fa-history"></i> Updated:{' '}
          {updatedAt.split('T')[0].split('-')[2]}
          {mon[updatedAt.split('T')[0].split('-')[1].replace(/^0+/, '')]}
          {', '}
          {updatedAt.split('T')[0].split('-')[0]}
        </small>
        <small className="float-end fw-bold" style={{ color: '#78909C' }}>
          <i class="fas fa-user-edit"></i> {postedBy.username}
        </small>
      </div>
      {showDeleteButton && showUpdateButton && (
        <div className="card-footer ps-2 pe-2 ">
          {showUpdateButton && (
            <button
              onClick={() => history.push(`/post/update/${post._id}`)}
              className="btn mt-1 btn-rounded btn-outline-info shadow-1-strong float-start"
            >
              Update
            </button>
          )}
          {showDeleteButton && (
            <button
              onClick={() => handleDelete(post._id)}
              className="btn mt-1 btn-rounded btn-outline-danger shadow-1-strong float-end"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
