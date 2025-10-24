-- Database: cweeterie
-- Compatible Supabase (PostgreSQL 14+)

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
SET search_path TO public;

-- ===============================
-- TABLE: users
-- ===============================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    bio VARCHAR(255) NOT NULL
);

-- ===============================
-- TABLE: idees
-- ===============================
CREATE TABLE idees (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    titre VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ===============================
-- TABLE: collections
-- ===============================
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    titre VARCHAR(255) NOT NULL
);

-- ===============================
-- TABLE: collection_idees
-- ===============================
CREATE TABLE collection_idees (
    collection_id INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE ON UPDATE CASCADE,
    idee_id INTEGER NOT NULL REFERENCES idees(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (collection_id, idee_id)
);

-- ===============================
-- TABLE: commentaires
-- ===============================
CREATE TABLE commentaires (
    id SERIAL PRIMARY KEY,
    idee_id INTEGER NOT NULL REFERENCES idees(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    text VARCHAR(255) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ===============================
-- INSERT: users
-- ===============================
INSERT INTO users (username, password, bio)
VALUES ('Sean', 'password123', 'My bio');

-- ===============================
-- INSERT: idees
-- ===============================
INSERT INTO idees (user_id, titre, description, photo, date) VALUES
(1, 'blueberrymuffins', 'Description for blueberrymuffins', '/pins/blueberrymuffins.jpg', CURRENT_DATE),
(1, 'breadsweet', 'Description for breadsweet', '/pins/breadsweet.jpg', CURRENT_DATE),
(1, 'brownies', 'Description for brownies', '/pins/brownies.jpg', CURRENT_DATE),
(1, 'buns', 'Description for buns', '/pins/buns.jpg', CURRENT_DATE),
(1, 'chocolatecoookie', 'Description for chocolatecoookie', '/pins/chocolatecoookie.jpg', CURRENT_DATE),
(1, 'coffeeMacaron', 'Description for coffeeMacaron', '/pins/coffeeMacaron.jpg', CURRENT_DATE),
(1, 'dantart', 'Description for dantart', '/pins/dantart.jpg', CURRENT_DATE),
(1, 'eggsandwich', 'Description for eggsandwich', '/pins/eggsandwich.jpg', CURRENT_DATE),
(1, 'firstcookies', 'Description for firstcookies', '/pins/firstcookies.jpg', CURRENT_DATE),
(1, 'japanese curry', 'Description for japanese curry', '/pins/japanese curry.jpg', CURRENT_DATE),
(1, 'lemonMadeleine', 'Description for lemonMadeleine', '/pins/lemonMadeleine.jpg', CURRENT_DATE),
(1, 'Macaron', 'Description for Macaron', '/pins/Macaron.jpg', CURRENT_DATE),
(1, 'Maple-Pecan-Bread-Pudding-3-1067x1600', 'Description for Maple-Pecan-Bread-Pudding', '/pins/Maple-Pecan-Bread-Pudding-3-1067x1600.jpg', CURRENT_DATE),
(1, 'more cinnamonrolls!', 'Description for more cinnamonrolls!', '/pins/more cinnamonrolls!.jpg', CURRENT_DATE),
(1, 'morepasta', 'Description for morepasta', '/pins/morepasta.jpg', CURRENT_DATE),
(1, 'Mousse', 'Description for Mousse', '/pins/Mousse.jpg', CURRENT_DATE),
(1, 'onepot', 'Description for onepot', '/pins/onepot.jpg', CURRENT_DATE),
(1, 'Palmier', 'Description for Palmier', '/pins/Palmier.jpg', CURRENT_DATE),
(1, 'pasta', 'Description for pasta', '/pins/pasta.jpg', CURRENT_DATE),
(1, 'pinkMaccaron', 'Description for pinkMaccaron', '/pins/pinkMaccaron.jpg', CURRENT_DATE),
(1, 'pudding', 'Description for pudding', '/pins/pudding.jpg', CURRENT_DATE),
(1, 'rouleauCannelle', 'Description for rouleauCannelle', '/pins/rouleauCannelle.jpg', CURRENT_DATE),
(1, 'sandwiches', 'Description for sandwiches', '/pins/sandwiches.jpg', CURRENT_DATE),
(1, 'supreme croisant', 'Description for supreme croisant', '/pins/supreme croisant.jpg', CURRENT_DATE),
(1, 'tartpastries', 'Description for tartpastries', '/pins/tartpastries.jpg', CURRENT_DATE),
(1, 'tiramisu', 'Description for tiramisu', '/pins/tiramisu.jpg', CURRENT_DATE),
(1, 'tiramisuCup', 'Description for tiramisuCup', '/pins/tiramisuCup.jpg', CURRENT_DATE),
(1, 'tonkatsu', 'Description for tonkatsu', '/pins/tonkatsu.jpg', CURRENT_DATE);
