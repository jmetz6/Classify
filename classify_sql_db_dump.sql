-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: classify
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  	`id` INTEGER NOT NULL AUTO_INCREMENT,
  	`username` VARCHAR(100) UNIQUE NOT NULL,
	`password` VARCHAR(100) NOT NULL,
  	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlists` (
  	`id` INTEGER AUTO_INCREMENT,
  	`name` VARCHAR(100) UNIQUE NOT NULL,
	`user` INTEGER NOT NULL,
	PRIMARY KEY (`id`),
   FOREIGN KEY (`user`) REFERENCES `users`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs` (
  	`id` INTEGER NOT NULL AUTO_INCREMENT,
  	`name` VARCHAR(100) UNIQUE NOT NULL,
  	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists` (
  	`id` INTEGER NOT NULL AUTO_INCREMENT,
  	`name` VARCHAR(100) UNIQUE NOT NULL,
  	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `song_artist_association`
--

DROP TABLE IF EXISTS `song_artist_associations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song_artist_associations` (
  	`id` INTEGER NOT NULL AUTO_INCREMENT,
  	`songID` INTEGER NOT NULL, 
  	`artistID` INTEGER NOT NULL,
  	PRIMARY KEY (`id`),
	FOREIGN KEY (`songID`) REFERENCES `songs`(`id`),
	FOREIGN KEY (`artistID`) REFERENCES `artists`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
/*!40101 SET character_set_client = @saved_cs_client */;




--
-- Table structure for table `playlist_song_associations`
--

DROP TABLE IF EXISTS `playlist_song_associations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlist_song_associations` (
  	`id` INTEGER NOT NULL AUTO_INCREMENT,
  	`songID` INTEGER NOT NULL, 
  	`playlistID` INTEGER NOT NULL,
  	PRIMARY KEY (`id`),
  	FOREIGN KEY (`songID`) REFERENCES `songs`(`id`),
	FOREIGN KEY (`playlistID`) REFERENCES `playlists`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Dumping data for table `users`
--


/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`username`, `password`) VALUES
	('admin', 'password'),
	('testing', 'testing'),
	('password', 'password');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;




--
-- Dumping data for table `playlists`
--

/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` (`name`, `user`) VALUES
	('Songs by Bach', (SELECT `id` FROM `users` WHERE `username`='testing')),
	('My songs', (SELECT `id` FROM `users` WHERE `username`='admin')),
	('Favorites', (SELECT `id` FROM `users` WHERE `username`='password'));
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;

 
--
-- Dumping data for table `songs`
--


/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` (`name`) VALUES
    ('Christmas Oratorio, BWV 248: Aria: Schliess, mein Herze, dies selige Wunder... (Alto)'),
    ('5 Stucke im Volkston, Op.102: 4. Nicht zu rasch'),
    ('Mozart: Symphony No. 25 in G Minor, K. 183: IV. Allegro'),
    ('Concerto Grosso in F Major, Op. 6, No. 2, HWV 320: III. Largo'),
    ('Handel: Keyboard Suite in G Minor, HWV 439: Gigue'),
    ('Christmas Oratorio, BWV 248: Aria: Schlafe, mein Liebster, geniesse der Ruh... (Alto)'),
    ('Mozart: Symphony No. 25 in G Minor, K. 183: II. Andante'),
    ('Violin Sonata in A Major, FWV 8: I. Allegretto ben moderato - Remastered'),
    ('Christmas Oratorio, BWV 248: Aria: Frohe Hirten, eilt, ach eilet... (Tenor)'),
    ('Slavonic Dances, Series 1, Op. 46, B. 83: No. 5'),
    ('Pieces for Cello and Piano, Op. 2: Prelude in F'),
    ('Violin Sonata in A Major, FWV 8: III. Recitativo - Fantasia - Remastered'),
    ('Violin Sonata in A Major, FWV 8: II. Allegro - Remastered'),
    ('Sonata in D Minor for Cello & Piano, L.135: 3. Finale (Anime) - Live'),
    ('Herz und Mund und Tat und Leben, BWV 147: Aria: Ich will von Jesu Wundern singen (Bass)'),
    ('Herz und Mund und Tat und Leben, BWV 147: Recitative: Verstockung kann Gewaltige verblenden (Bass)'),
    ('Herz und Mund und Tat und Leben, BWV 147: Recitative: Der hochsten Allmacht Wunderhand (Alto)'),
    ('Christmas Oratorio, BWV 248: Herrscher des Himmels, erhore das Lallen... (Chorus)'),
    ('Herz und Mund und Tat und Leben, BWV 147: Aria: Hilf, Jesu, hilf, dass ich auch dich bekenne (Tenor)'),
    ('Orchestral Suite No. 1 in C Major, BWV 1066: IV. Forlane');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
 
--
-- Dumping data for table `name`
-- 


/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists`(`name`) VALUES
    ('Robert Schumann'),
    ('George Frideric Handel'),
    ('Wolfgang Amadeus Mozart'),
    ('Antonin Dvorak'),
    ('Yuki Ito'),
    ('CesarFranck'),
    ('Claude Debussy'),
    ('Johann Sebastian Bach');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;


--
-- Dumping data for table `song_artists_associations`
--  
  

/*!40000 ALTER TABLE `song_artist_associations` DISABLE KEYS */;
INSERT INTO `song_artist_associations` (`songID`, `artistID`) VALUES
	((SELECT `id` FROM `songs` WHERE `name`='Christmas Oratorio, BWV 248: Aria: Schliess, mein Herze, dies selige Wunder... (Alto)'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='5 Stucke im Volkston, Op.102: 4. Nicht zu rasch'), (SELECT `id` FROM `artists` WHERE `name`='Robert Schumann')),
	((SELECT `id` FROM `songs` WHERE `name`='Mozart: Symphony No. 25 in G Minor, K. 183: IV. Allegro'), (SELECT `id` FROM `artists` WHERE `name`='Wolfgang Amadeus Mozart')),
	((SELECT `id` FROM `songs` WHERE `name`='Concerto Grosso in F Major, Op. 6, No. 2, HWV 320: III. Largo'), (SELECT `id` FROM `artists` WHERE `name`='George Frideric Handel')),
	((SELECT `id` FROM `songs` WHERE `name`='Handel: Keyboard Suite in G Minor, HWV 439: Gigue'), (SELECT `id` FROM `artists` WHERE `name`='George Frideric Handel')),
	((SELECT `id` FROM `songs` WHERE `name`='Christmas Oratorio, BWV 248: Aria: Schlafe, mein Liebster, geniesse der Ruh... (Alto)'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Mozart: Symphony No. 25 in G Minor, K. 183: II. Andante'), (SELECT `id` FROM `artists` WHERE `name`='Wolfgang Amadeus Mozart')),
	((SELECT `id` FROM `songs` WHERE `name`='Violin Sonata in A Major, FWV 8: I. Allegretto ben moderato - Remastered'), (SELECT `id` FROM `artists` WHERE `name`='CesarFranck')),
	((SELECT `id` FROM `songs` WHERE `name`='Christmas Oratorio, BWV 248: Aria: Frohe Hirten, eilt, ach eilet... (Tenor)'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Slavonic Dances, Series 1, Op. 46, B. 83: No. 5'), (SELECT `id` FROM `artists` WHERE `name`='Antonin Dvorak')),
	((SELECT `id` FROM `songs` WHERE `name`='Pieces for Cello and Piano, Op. 2: Prelude in F'), (SELECT `id` FROM `artists` WHERE `name`='Yuki Ito')),
	((SELECT `id` FROM `songs` WHERE `name`='Violin Sonata in A Major, FWV 8: III. Recitativo - Fantasia - Remastered'), (SELECT `id` FROM `artists` WHERE `name`='CesarFranck')),
	((SELECT `id` FROM `songs` WHERE `name`='Violin Sonata in A Major, FWV 8: II. Allegro - Remastered'), (SELECT `id` FROM `artists` WHERE `name`='CesarFranck')),
	((SELECT `id` FROM `songs` WHERE `name`='Sonata in D Minor for Cello & Piano, L.135: 3. Finale (Anime) - Live'), (SELECT `id` FROM `artists` WHERE `name`='Claude Debussy')),
	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Aria: Ich will von Jesu Wundern singen (Bass)'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Recitative: Verstockung kann Gewaltige verblenden (Bass)'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Recitative: Der hochsten Allmacht Wunderhand (Alto)'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Christmas Oratorio, BWV 248: Herrscher des Himmels, erhore das Lallen... (Chorus)'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Aria: Hilf, Jesu, hilf, dass ich auch dich bekenne (Tenor)'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Orchestral Suite No. 1 in C Major, BWV 1066: IV. Forlane'), (SELECT `id` FROM `artists` WHERE `name`='Johann Sebastian Bach'));    
/*!40000 ALTER TABLE `song_artist_associations` ENABLE KEYS */;




--
-- Dumping data for table `playlist_song_associations`
--

/*!40000 ALTER TABLE `playlist_song_associations` DISABLE KEYS */;
INSERT INTO `playlist_song_associations` (`songID`, `playlistID`) VALUES 
	((SELECT `id` FROM `songs` WHERE `name`='Christmas Oratorio, BWV 248: Aria: Schliess, mein Herze, dies selige Wunder... (Alto)'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Christmas Oratorio, BWV 248: Aria: Schlafe, mein Liebster, geniesse der Ruh... (Alto)'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
	((SELECT `id` FROM `songs` WHERE `name`='Christmas Oratorio, BWV 248: Aria: Frohe Hirten, eilt, ach eilet... (Tenor)'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
  	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Aria: Ich will von Jesu Wundern singen (Bass)'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
  	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Recitative: Verstockung kann Gewaltige verblenden (Bass)'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
  	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Recitative: Der hochsten Allmacht Wunderhand (Alto)'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
  	((SELECT `id` FROM `songs` WHERE `name`='Christmas Oratorio, BWV 248: Herrscher des Himmels, erhore das Lallen... (Chorus)'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
  	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Aria: Hilf, Jesu, hilf, dass ich auch dich bekenne (Tenor)'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
  	((SELECT `id` FROM `songs` WHERE `name`='Orchestral Suite No. 1 in C Major, BWV 1066: IV. Forlane'), (SELECT `id` FROM `playlists` WHERE `name`='Songs by Bach')),
  	((SELECT `id` FROM `songs` WHERE `name`='Pieces for Cello and Piano, Op. 2: Prelude in F'), (SELECT `id` FROM `playlists` WHERE `name`='My songs')),
  	((SELECT `id` FROM `songs` WHERE `name`='Violin Sonata in A Major, FWV 8: I. Allegretto ben moderato - Remastered'), (SELECT `id` FROM `playlists` WHERE `name`='My songs')),
  	((SELECT `id` FROM `songs` WHERE `name`='Sonata in D Minor for Cello & Piano, L.135: 3. Finale (Anime) - Live'), (SELECT `id` FROM `playlists` WHERE `name`='My songs')),
  	((SELECT `id` FROM `songs` WHERE `name`='Herz und Mund und Tat und Leben, BWV 147: Aria: Hilf, Jesu, hilf, dass ich auch dich bekenne (Tenor)'), (SELECT `id` FROM `playlists` WHERE `name`='Favorites')),
	((SELECT `id` FROM `songs` WHERE `name`='Slavonic Dances, Series 1, Op. 46, B. 83: No. 5'), (SELECT `id` FROM `playlists` WHERE `name`='Favorites')),
	((SELECT `id` FROM `songs` WHERE `name`='Mozart: Symphony No. 25 in G Minor, K. 183: IV. Allegro'), (SELECT `id` FROM `playlists` WHERE `name`='Favorites')); 	
/*!40000 ALTER TABLE `playlist_song_associations` ENABLE KEYS */;




/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

  	



