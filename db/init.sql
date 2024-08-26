-- profiles table
CREATE TABLE profiles_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_id INT REFERENCES profiles_users(id),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- courses table
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT,
  cover_url TEXT,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- modules table
CREATE TABLE courses_modules (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  course_id INT REFERENCES courses(id),
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- videos table
CREATE TABLE modules_videos (
  id SERIAL PRIMARY KEY,
  module_id INT REFERENCES courses_modules(id),
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255),
  duration INT,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- users_courses table
CREATE TABLE users_courses (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  course_id INT REFERENCES courses(id)
);

-- insert initial profiles
INSERT INTO profiles_users (name) VALUES 
('admin'),
('writer');

-- insert initial admin user
INSERT INTO users (name, email, password, profile_id) VALUES 
('Administrador', 'admin@supercourses.com', '7877e7d2da6fe021f557980d0396919b16cd2ea8564ab12fc18a1795f7b8bc12e02acf4ab8733a00513cb9ecf6e0329656f3fd6ee3859d355a0113f75daeec81', 1),
('Writer', 'writer@supercourses.com', '7877e7d2da6fe021f557980d0396919b16cd2ea8564ab12fc18a1795f7b8bc12e02acf4ab8733a00513cb9ecf6e0329656f3fd6ee3859d355a0113f75daeec81', 2);
