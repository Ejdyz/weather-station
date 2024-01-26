CREATE TABLE `ejdy_cz`.`weather-last-days` (`id` INT NOT NULL AUTO_INCREMENT , `day` DATETIME NOT NULL , `highestTemperatrue` FLOAT NOT NULL , `lowestTemperatrue` FLOAT NOT NULL , `highestHumidity` FLOAT NOT NULL , `lowestHumidity` FLOAT NOT NULL , `wasRaining` BOOLEAN NOT NULL , `highestRaining` FLOAT NOT NULL , `highestLight` INT NOT NULL , `averagePressure` FLOAT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
CREATE TABLE `ejdy_cz`.`weather-records` (`id` INT NOT NULL AUTO_INCREMENT , `numberInDay` TINYINT NOT NULL , `time` DATETIME NOT NULL , `temperature` FLOAT NOT NULL , `humidity` FLOAT NOT NULL , `rain` FLOAT NOT NULL , `isRaining` BOOLEAN NOT NULL , `light` INT NOT NULL , `pressure` FLOAT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


INSERT INTO `weather-records` (`id`, `numberInDay`, `time`, `temperature`, `humidity`, `rain`, `isRaining`, `light`, `pressure`) VALUES (NULL, '1', '2024-01-25 16:30:57', '19.7', '56.2', '67.1', '1', '22090', '1018.7');


INSERT INTO `ejdy_cz`.`weather-last-days` (
    day,
    highestTemperatrue,
    lowestTemperatrue,
    highestHumidity,
    lowestHumidity,
    wasRaining,
    highestRaining,
    highestLight,
    averagePressure
)
SELECT
	NOW(),
    MAX(temperature) AS highestTemperatrue,
    MIN(temperature) AS lowestTemperatrue,
    MAX(humidity) AS highestHumidity,
    MIN(humidity) AS lowestHumidity,
    CASE WHEN SUM(CASE WHEN isRaining = TRUE THEN 1 ELSE 0 END) > 0 THEN TRUE ELSE FALSE END AS wasRaining,
    MAX(rain) AS highestRaining,
    MAX(light) AS highestLight,
    AVG(pressure) AS averagePressure
FROM
    `ejdy_cz`.`weather-records`
ORDER BY id DESC LIMIT 143;

