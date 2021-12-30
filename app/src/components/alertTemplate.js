const AlertTemplate = ({ options, message, close }) => (
  <div>
    {options.type === "info" && (
      <div
        className="alert alert-primary alert-dismissible shadow-5-strong  d-flex align-items-center "
        role="alert"
      >
        <i class="fas fa-exclamation-circle fa-2x me-2"></i>
        <div>
          {" "}
          {message}
          <button className="btn-close" onClick={close}>
            X
          </button>
        </div>
      </div>
    )}
    {options.type === "success" && (
      <div
        className="alert alert-success alert-dismissible shadow-5-strong  d-flex align-items-center"
        role="alert"
      >
        <i class="fas fa-check-circle fa-2x me-2"></i>
        <div>
          {message}
          <button className="btn-close" onClick={close}></button>
        </div>
      </div>
    )}
    {options.type === "error" && (
      <div
        className="alert alert-danger d-flex align-items-center alert-dismissible shadow-5-strong "
        role="alert"
      >
        <i class="fas fa-times-circle fa-2x me-2"></i>
        <div>
          {message}
          <button className="btn-close my-auto py-auto" onClick={close}></button>
        </div>
      </div>
    )}
  </div>
);
export default AlertTemplate;