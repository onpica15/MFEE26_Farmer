import React from 'react';

const Login = ({ newUser, setNewUser, authenticateUser }) => {
    return (
        <div className="card w-100 text-center border-white login-content">
            <div className="row">
                <div className="clo-12">
                    <h5>歡迎使用小鱻肉真人客服^_^</h5>
                </div>
                <div className="d-flex justify-content-center py-1">
                    <div className="col-4">
                        <input
                            type="text"
                            name="username"
                            value={newUser}
                            className="form-control mb-3"
                            placeholder="請輸入您的暱稱"
                            autoComplete="off"
                            onChange={({ currentTarget: input }) =>
                                setNewUser(input.value)
                            }
                            onKeyPress={(e) =>
                                e.code === 'Enter' || e.code === 108
                                    ? authenticateUser()
                                    : null
                            }
                        />
                        <button
                            className="btn btn-success w-100"
                            onClick={() => authenticateUser()}
                        >
                            進入真人客服系統
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
