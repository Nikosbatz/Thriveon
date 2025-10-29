import { fetchWrapper } from "./fetchWrapper";
const BASE_URI = "/api";

export async function login(email, password) {
  const loginData = { email: email, password: password };

  console.log(loginData);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(loginData),
  };

  const res = await fetch(`${BASE_URI}/user/login`, options);

  if (res.status === 200) {
    const data = await res.json();
    data.accessToken
      ? localStorage.setItem("token", data.accessToken)
      : alert("Server Could not Create Token");

    return;
  } else if (res.status === 401) {
    throw new Error("Wrong Credentials...");
  }
}

export async function register(email, password) {
  const registerData = { email: email, password: password };

  console.log("register data:" + registerData);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(registerData),
  };

  const res = await fetch(`${BASE_URI}/user/register`, options);

  // If status === created successfully || status === bad gateway (Could not send verification email) then save token
  if (res.status === 201 || res.status === 502) {
    const data = await res.json();
    data.accessToken
      ? localStorage.setItem("token", data.accessToken)
      : alert("Server Could not Create Token");

    return;
  } else if (res.status === 400) {
    throw new Error("A user with this E-mail already exists...");
  } else if (res.status === 409) {
    throw new Error("User Couldn't be Created. Try again later...");
  }
}

export async function postEmailVerificationToken(verificationToken) {
  console.log("Verify Email");

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ verificationToken: verificationToken }),
  };

  const res = await fetch(`${BASE_URI}/user/verify-email`, options);

  if (res.status === 200) {
    return;
  } else if (res.status === 400) {
    throw new Error("Invalid or Expired verification token");
  } else {
    throw new Error("Server Error. Please try again later...");
  }
}

export async function postForgotPasswordEmail(email) {
  console.log("Verify Email");

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ email: email }),
  };

  const res = await fetch(`${BASE_URI}/user/forgot-password`, options);

  if (res.status === 200) {
    return;
  } else if (res.status === 400) {
    throw new Error("User wasn't found");
  }
}

export async function postResetPassword(password, token) {
  console.log("Reset Password");

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ password: password }),
  };

  const res = await fetch(`${BASE_URI}/user/reset-password/${token}`, options);

  if (res.status === 200) {
    return;
  } else if (res.status === 400) {
    console.log("asdadas");
    throw new Error("Invalid password reset token.");
  }
}

export async function postUserInfo(info) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(info),
  };
  const res = await fetchWrapper(`${BASE_URI}/user/update-info`, options);

  if (res.status === 200) {
    return await res.json();
  } else {
    throw new Error(
      "Something went wrong. If the error persists please contact support"
    );
  }
}

export async function getUserInfo() {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const res = await fetchWrapper(`${BASE_URI}/user/info`, options);

  if (res.status === 200) {
    return await res.json();
  } else {
    throw new Error("User not Found!");
  }
}

// Returns JSON, NOT res.
export async function getFoods(path) {
  /* 
  path = "/foods" to fetch all the foods from the DB
  path = "/foods/userlogs" to fetch the User's food logs (Today currently...)
  */

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const res = await fetchWrapper(`${BASE_URI}${path}`, options);

  if (res.ok) {
    const data = await res.json();
    //console.log(data);
    return data;
  } else {
    // Throws when food logs array is empty
    throw new Error(`Error fetching foods: ${res.status}`);
  }
}

// Posts food object on /api/foods
// reqData must be JSON Object
export async function postFood(data, path) {
  // Relative URI cause of the PROXY (To avoid CORS)
  const uri = `${BASE_URI}${path}`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  };
  const res = await fetchWrapper(uri, options);

  if (res.status === 201 || res.status === 200) {
    return res.json();
  } else if (res.status === 409) {
    throw new Error(
      `Error: ${res.status}\nAn Item with this name already exists! `
    );
  }
}

export async function deleteUserLogsFood(food) {
  // Relative URI cause of the PROXY (To avoid CORS)
  console.log(food);
  const uri = `${BASE_URI}/foods/userlogs/${food._id}`;
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const res = await fetchWrapper(uri, options);
  const message = await res.json();
  if (res.status === 200) {
    return;
  } else if (res.status === 500) {
    throw new Error(message.message);
  }
}

export async function getUserWaterIntake() {
  // userId: "68af8401a59ee8c515ee275e"
  const uri = `${BASE_URI}/health/water-logs`;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const res = await fetchWrapper(uri, options);

  if (res.ok) {
    const data = await res.json();
    return data.water;
  } else {
    throw new Error(`Error fetching user water intake: ${res.status}`);
  }
}

export async function postUserWaterIntake(water) {
  const uri = `${BASE_URI}/health/water-logs`;

  console.log("water " + water);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ water: water }),
  };

  const res = await fetchWrapper(uri, options);

  if (res.status === 200 || res.status === 201) {
    return water;
  } else {
    throw Error("Could not find userId...");
  }
}

export async function getUserActivities() {
  const uri = `${BASE_URI}/activities/user-logs`;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const res = await fetchWrapper(uri, options);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`Error fetching user water intake: ${res.status}`);
  }
}

export async function postUserActivity(activityValues) {
  const uri = `${BASE_URI}/activities/user-logs`;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityValues),
  };

  const res = await fetchWrapper(uri, options);

  if (res.status === 200 || res.status === 201) {
    return;
  } else {
    throw Error();
  }
}

export async function getUserWeightLogs() {
  const uri = `${BASE_URI}/health/weight-logs`;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  let res = await fetchWrapper(uri, options);

  if (res.status === 200) {
    res = await res.json();
    const data = res.data;
    return data;
  } else {
    throw new Error();
  }
}

export async function postUserWeightLogs(weight) {
  const uri = `${BASE_URI}/health/weight-logs`;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ weight: weight }),
  };

  const res = await fetchWrapper(uri, options);

  if (res.status === 200 || res.status === 201) {
    console.log("200 weight");
    return;
  } else {
    throw Error();
  }
}
