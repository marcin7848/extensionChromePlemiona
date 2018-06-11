-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Czas generowania: 27 Sie 2017, 11:25
-- Wersja serwera: 10.1.13-MariaDB
-- Wersja PHP: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `plemiona`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `config`
--

CREATE TABLE `config` (
  `config_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `config_value` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `config`
--

INSERT INTO `config` (`config_name`, `config_value`) VALUES
('bot_on', '0'),
('id_glownej_wioski', '49103'),
('nr_swiata', '118'),
('password', 'KacZ987@KM'),
('time_bot_off', '0'),
('time_random_to_next_send', '720000'),
('time_sent', '1501340821395'),
('time_wioski_premium', '22:00-22:15,23:30-23:45,3:00-3:15,7:00-7:15,10:30-10:45,13:30-13:45,16:00-16:15,18:45-19:00,20:45-21:00'),
('username', 'Bonkai');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `farma`
--

CREATE TABLE `farma` (
  `id` int(11) NOT NULL,
  `id_wioski` int(11) NOT NULL,
  `id_farma` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `farma`
--

INSERT INTO `farma` (`id`, `id_wioski`, `id_farma`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15),
(16, 1, 16),
(17, 1, 17),
(18, 1, 18),
(19, 1, 19),
(20, 1, 20),
(21, 1, 21),
(22, 1, 22),
(23, 1, 23),
(24, 1, 24),
(25, 1, 25),
(26, 1, 26),
(27, 1, 27),
(28, 1, 28),
(29, 1, 29),
(30, 1, 30);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `farma_wioski`
--

CREATE TABLE `farma_wioski` (
  `id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `farma_wioski`
--

INSERT INTO `farma_wioski` (`id`, `x`, `y`) VALUES
(1, 483, 717),
(2, 484, 724),
(3, 486, 709),
(4, 486, 718),
(5, 487, 709),
(6, 487, 711),
(7, 487, 714),
(8, 487, 715),
(9, 487, 722),
(10, 489, 711),
(11, 490, 713),
(12, 490, 718),
(13, 490, 719),
(14, 490, 720),
(15, 491, 709),
(16, 491, 710),
(17, 491, 714),
(18, 491, 717),
(19, 491, 719),
(20, 492, 713),
(21, 492, 717),
(22, 493, 717),
(23, 493, 722),
(24, 494, 713),
(25, 494, 716),
(26, 495, 714),
(27, 495, 722),
(28, 496, 722),
(29, 497, 724),
(30, 498, 713);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lista_wiosek`
--

CREATE TABLE `lista_wiosek` (
  `id` int(11) NOT NULL,
  `id_wioski` int(11) NOT NULL,
  `nazwa` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `checked` int(11) NOT NULL,
  `ilosc_farmy` int(11) NOT NULL,
  `aktywna_farma` int(11) NOT NULL,
  `liczba_pol_farma` int(11) NOT NULL,
  `last_wsp_farma` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `array_wsp_farma` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `premium_on` int(11) NOT NULL,
  `max_cost_premium` int(11) NOT NULL,
  `min_surowcow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `lista_wiosek`
--

INSERT INTO `lista_wiosek` (`id`, `id_wioski`, `nazwa`, `x`, `y`, `checked`, `ilosc_farmy`, `aktywna_farma`, `liczba_pol_farma`, `last_wsp_farma`, `array_wsp_farma`, `premium_on`, `max_cost_premium`, `min_surowcow`) VALUES
(1, 49103, 'Wioska Bonkai', 490, 717, 1, 3, 1, 8, '491|719', '496|722,487|711,483|717,489|711,494|713,490|720,492|713,491|717,493|722,492|717,491|714,498|713,486|718,490|718,493|717,487|722,495|722,490|719,487|714,494|716,491|710,487|715,495|714,491|719,490|713,487|709,484|724,491|709,497|724,486|709', 1, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wioski_premium`
--

CREATE TABLE `wioski_premium` (
  `id` int(11) NOT NULL,
  `nr_swiata` int(11) NOT NULL,
  `id_wioski` int(11) NOT NULL,
  `process` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `wioski_premium`
--

INSERT INTO `wioski_premium` (`id`, `nr_swiata`, `id_wioski`, `process`) VALUES
(5, 116, 85688, 64),
(8, 114, 107074, 64),
(9, 112, 110392, 64),
(10, 110, 106190, 64),
(11, 108, 93714, 64);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`config_name`);

--
-- Indexes for table `farma`
--
ALTER TABLE `farma`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farma_wioski`
--
ALTER TABLE `farma_wioski`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lista_wiosek`
--
ALTER TABLE `lista_wiosek`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wioski_premium`
--
ALTER TABLE `wioski_premium`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `farma`
--
ALTER TABLE `farma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT dla tabeli `farma_wioski`
--
ALTER TABLE `farma_wioski`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT dla tabeli `lista_wiosek`
--
ALTER TABLE `lista_wiosek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `wioski_premium`
--
ALTER TABLE `wioski_premium`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
