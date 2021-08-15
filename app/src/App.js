import logo from './logo.svg';
import './App.css';

function App() {
  function handleSubmit(e) {
    e.preventDefault();
    
  }

  return (
    <form onsubmit={handleSubmit} className="user" method="post" action="/login">
      <div className="form-group">
        <input
          className="form-control form-control-user"
          type="text"
          data-toggle="tooltip"
          data-bs-tooltip=""
          id="exampleInputEmail"
          aria-describedby="emailHelp"
          placeholder="Enter Username"
          name="username"
          required=""
        />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-user"
          type="password"
          id="exampleInputPassword"
          placeholder="Password"
          name="password"
          required=""
        />
      </div>
      <div className="form-group"></div>
      <button className="btn btn-primary btn-block text-white" type="submit">
        Login
      </button>
      <a className="btn btn-success btn-block text-white" href="/download">
        Go to Download Page
      </a>

      <hr />
    </form>
  );
}

export default App;
