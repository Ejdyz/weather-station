CREATE TABLE `ejdy_cz`.`weather-last-days` (`id` INT NOT NULL AUTO_INCREMENT , `day` DATETIME NOT NULL , `highestTemperatrue` FLOAT NOT NULL , `lowestTemperatrue` FLOAT NOT NULL , `highestHumidity` FLOAT NOT NULL , `lowestHumidity` FLOAT NOT NULL , `wasRaining` BOOLEAN NOT NULL , `highestRaining` FLOAT NOT NULL , `highestLight` INT NOT NULL , `averagePressure` FLOAT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
CREATE TABLE `ejdy_cz`.`weather-records` (`id` INT NOT NULL AUTO_INCREMENT , `numberInDay` TINYINT NOT NULL , `time` DATETIME NOT NULL , `temperature` FLOAT NOT NULL , `humidity` FLOAT NOT NULL , `rain` FLOAT NOT NULL , `isRaining` BOOLEAN NOT NULL , `light` INT NOT NULL , `pressure` FLOAT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


INSERT INTO `weather-records` (`id`, `numberInDay`, `time`, `temperature`, `humidity`, `rain`, `isRaining`, `light`, `pressure`) VALUES (NULL, '1', '2024-01-25 16:30:57', '19.7', '56.2', '67.1', '1', '22090', '1018.7');



# manual creation of new day record
INSERT INTO `weather-last-days`(
    DAY,
    highestTemperature,
    lowestTemperature,
    highestHumidity,
    lowestHumidity,
    wasRaining,
    highestRaining,
    highestLight,
    highestPressure,
    lowestPressure
)
SELECT
    NOW(), MAX(temperature) AS highestTemperature,
    MIN(temperature) AS lowestTemperature,
    MAX(humidity) AS highestHumidity,
    MIN(humidity) AS lowestHumidity,
    CASE WHEN SUM(
        CASE WHEN isRaining = TRUE THEN 1 ELSE 0
    END
    ) > 0 THEN TRUE ELSE FALSE
END AS wasRaining,
MAX(rain) AS highestRaining,
MIN(light) AS highestLight,
MAX(pressure) AS highestPressure,
MIN(pressure) AS lowestPressure
FROM
    (
    SELECT
        *
    FROM
        `weather-records`
    WHERE
        DATE(createdAt) = "2024-4-23"
) AS subquery;
