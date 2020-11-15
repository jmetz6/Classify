--users
--add
INSERT INTO `users` (`username`, `password`) VALUES 
(:usernameInput, :passwordInput);

--edit
UPDATE `users`
SET `username`=:usernameInput, `password`=:passwordInput
WHERE `id`=:userIDInput 

--remove
DELETE FROM `users` WHERE `username`=:usernameInput;

--playlists
--add
INSERT INTO `playlists` (`name`, `user`) VALUES 
(:playlistNameInput, (SELECT `id` FROM `users` WHERE `name`=:usernameInput));

--edit
UPDATE `playlists`
SET `name`=:nameInput, `user`=(SELECT `id` FROM `users` WHERE `username`=:usernameInput)
WHERE `name`=:playlistNameInput 

--remove
DELETE FROM `playlists` WHERE `name`=:playlistNameInput;

--songs
--add
INSERT INTO `songs` (`name`) VALUES 
(:songNameInput);
userIDInput 

INSERT INTO `artists` (`name`) VALUES 
(:songArtistName);

INSERT INTO `song_artist_association` (`songID`, `artistID`) VALUES 
((SELECT `id` FROM `songs` WHERE `name`=:songNameInput), (SELECT `id` FROM `artists` WHERE `name`=:songArtistName));

--edit
UPDATE `songs`
SET `name`=:songNameInput
WHERE `name`=:songNameOriginal

--remove
DELETE FROM `songs` WHERE `name`=:songNameInput;

--artists
--add
INSERT INTO `artists` (`name`) VALUES 
(:artistNameInput);

--edit
UPDATE `artists`
SET `name`=:artistNameInput
WHERE `name`=:artistNaneOriginal

--remove
DELETE FROM `artists` WHERE `name`=:artistNameInput;

--add song to playlist
INSERT INTO `playlist_song_association` (`playlistID`, `songID`) VALUES 
((SELECT `id` FROM `playlists` WHERE `name`=:playlistNameInput), (SELECT `id` FROM `songs` WHERE `name`=:songNameInput));

--delete from from playlist
DELETE FROM `playlist_song_association` WHERE 
	`playlistID`=(SELECT `id` FROM `playlists` WHERE `name`=:playlistNameInput) AND 
	`songID`=(SELECT `id` FROM `songs` WHERE `name`=:songNameInput);
	
--select playlist
SELECT * FROM `playlist_song_association` WHERE `playlistID`=(SELECT `id` FROM `playlists` WHERE `name`=:playlistNameInput);
	
--song search
SELECT * FROM `songs` WHERE `name`=:searchText;

--artist search
SELECT * FROM `artists` WHERE `name`=:searchText;