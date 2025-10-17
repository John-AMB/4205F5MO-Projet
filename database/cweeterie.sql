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
(1, 'blueberrymuffins', 'Description for blueberrymuffins', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746926067/recettes/fycsqppqx8cpb2vjnx7k.jpg', CURRENT_DATE),
(1, 'breadsweet', 'Description for breadsweet', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747251575/recettes/vgilckicjd25wbvyj3aq.jpg', CURRENT_DATE),
(1, 'brownies', 'Description for brownies', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746926091/recettes/hknulalza1ha3aue2yiu.jpg', CURRENT_DATE),
(1, 'buns', 'Description for buns', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746894888/recettes/tryorzqa1jiuygs7oppz.jpg', CURRENT_DATE),
(1, 'chocolatecoookie', 'Description for chocolatecoookie', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746926118/recettes/bouhjvhz22oepcsha9c6.jpg', CURRENT_DATE),
(1, 'coffeeMacaron', 'Description for coffeeMacaron', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746926161/recettes/v9ssc89xclcv9lstek5h.jpg', CURRENT_DATE),
(1, 'dantart', 'Description for dantart', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747064953/recettes/f2e0uyedzm14jpdxnroi.jpg', CURRENT_DATE),
(1, 'eggsandwich', 'Description for eggsandwich', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747183043/recettes/tf1rdkwe4uio9pgqv6pk.jpg', CURRENT_DATE),
(1, 'firstcookies', 'Description for firstcookies', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747183150/recettes/telb69x93nrfbs0pgytz.jpg', CURRENT_DATE),
(1, 'japanese curry', 'Description for japanese curry', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747183086/recettes/vygksg8fpzbkbmncoidq.jpg', CURRENT_DATE),
(1, 'lemonMadeleine', 'Description for lemonMadeleine', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746926145/recettes/q5bx14z4wcrgdcxsbcyp.jpg', CURRENT_DATE),
(1, 'Macaron', 'Description for Macaron', '/pins/Macaron.jpg', CURRENT_DATE),
(1, 'Maple-Pecan-Bread-Pudding-3-1067x1600', 'Description for Maple-Pecan-Bread-Pudding', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746925740/recettes/njq7mevjh5bq3kxfhrvb.jpg', CURRENT_DATE),
(1, 'more cinnamonrolls!', 'Description for more cinnamonrolls!', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1760375087/tyewjazwdqtqqhtvquee.jpg', CURRENT_DATE),
(1, 'morepasta', 'Description for morepasta', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747009082/recettes/mtdfixcifeohsx5ldrf2.jpg', CURRENT_DATE),
(1, 'Mousse', 'Description for Mousse', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747009208/recettes/tmhlsc2dswz1pbsmal0k.jpg', CURRENT_DATE),
(1, 'onepot', 'Description for onepot', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747009129/recettes/mzplis8txijtirxjupp3.jpg', CURRENT_DATE),
(1, 'Palmier', 'Description for Palmier', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746926191/recettes/vajhwrvuwkpgcfet5lyg.jpg', CURRENT_DATE),
(1, 'pasta', 'Description for pasta', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747009160/recettes/jx2rpzlbgrgcrfu8hsfm.jpg', CURRENT_DATE),
(1, 'pudding', 'Description for pudding', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746926205/recettes/gthqyrxyiciujshgubjx.jpg', CURRENT_DATE),
(1, 'rouleauCannelle', 'Description for rouleauCannelle', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747009015/recettes/em0tezsdkhgnwetwgdid.jpg', CURRENT_DATE),
(1, 'sandwiches', 'Description for sandwiches', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747325888/recettes/kiwfkiqigngzykjzrfzo.jpg', CURRENT_DATE),
(1, 'supreme croisant', 'Description for supreme croisant', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747009208/recettes/tmhlsc2dswz1pbsmal0k.jpg', CURRENT_DATE),
(1, 'tiramisu', 'Description for tiramisu', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746925583/recettes/xo8ehcbrxtn4mlnxy8of.jpg', CURRENT_DATE),
(1, 'tiramisuCup', 'Description for tiramisuCup', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1746926260/recettes/xqvjxhcsnjkg0jk8tuxj.jpg', CURRENT_DATE),
(1, 'tonkatsu', 'Description for tonkatsu', 'https://res.cloudinary.com/djkzkpom6/image/upload/v1747009234/recettes/u6cs9czrsbuz6wdertdj.jpg', CURRENT_DATE);
