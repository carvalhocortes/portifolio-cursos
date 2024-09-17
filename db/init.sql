CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile VARCHAR(50) NOT NULL CHECK (profile IN ('admin', 'writer')),
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
CREATE TABLE modules_classes (
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

-- insert initial admin user
INSERT INTO users (id, name, email, password, profile) VALUES
('cee72187-d835-432e-8326-6c7772444c4d', 'Administrador', 'admin@supercourses.com', '123456','admin'),
('17c2859a-8437-4ef4-8949-36caf45bd04f', 'Writer', 'writer@supercourses.com', '123456', 'writer');
