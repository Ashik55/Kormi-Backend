-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 30, 2020 at 10:00 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kormi`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL,
  `com_code` text,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `role`, `com_code`, `create_date`) VALUES
(4, 'disys@gmail.com', 'di12345', 'admin', '', '2020-11-25 16:21:15'),
(5, 'user@gmail.com', 'di12345', 'user', 'SACMBx7Zt5MEmWX', '2020-11-25 16:22:13');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `user_id` text NOT NULL,
  `com_code` text NOT NULL,
  `in_time` datetime NOT NULL,
  `in_loc` text NOT NULL,
  `out_time` datetime DEFAULT NULL,
  `out_loc` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `user_id`, `com_code`, `in_time`, `in_loc`, `out_time`, `out_loc`, `create_date`) VALUES
(2, 'a20', 'c1', '2020-11-21 06:07:14', 'dhgvcdhgv', '2020-11-21 06:07:20', 'dhgvcdhgv', '2020-11-21 06:07:14'),
(3, 'a20', 'c1', '2020-11-21 06:07:49', 'dhgvcdhgv', '2020-11-21 06:07:50', 'dhgvcdhgv', '2020-11-21 06:07:49'),
(4, 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'SACMBx7Zt5MEmWX', '2020-11-21 06:27:18', 'LatLng(23.8021587, 90.37067030000003)', NULL, '', '2020-11-21 06:27:18');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `parent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `parent`) VALUES
(1, 'ELECTRONICS', NULL),
(2, 'TELEVISIONS', 1),
(3, 'TUBE', 1),
(4, 'LCD', 2),
(5, 'PLASMA', 2),
(6, 'PORTABLE ELECTRONICS', 1),
(7, 'MP3 PLAYERS', 1),
(8, 'FLASH', 7),
(9, 'CD PLAYERS', 6),
(10, '2 WAY RADIOS', 6);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `deal_code` text NOT NULL,
  `comment` text NOT NULL,
  `comment_code` text NOT NULL,
  `user_id` text NOT NULL,
  `user_name` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comment_child`
--

CREATE TABLE `comment_child` (
  `id` int(11) NOT NULL,
  `comment_code` text NOT NULL,
  `comment_text` text NOT NULL,
  `user_id` text NOT NULL,
  `user_name` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `company_central`
--

CREATE TABLE `company_central` (
  `id` int(11) NOT NULL,
  `com_code` text NOT NULL,
  `com_name` text NOT NULL,
  `com_address` text NOT NULL,
  `com_latlong` text NOT NULL,
  `com_mobile` text NOT NULL,
  `com_email` text NOT NULL,
  `com_size` text NOT NULL,
  `com_type` text NOT NULL,
  `com_contact_person` text NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `paid` tinyint(1) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_central`
--

INSERT INTO `company_central` (`id`, `com_code`, `com_name`, `com_address`, `com_latlong`, `com_mobile`, `com_email`, `com_size`, `com_type`, `com_contact_person`, `enable`, `paid`, `create_date`) VALUES
(3, 'SACMBx7Zt5MEmWX', 'DI System', 'Mirpur Kajipara', '23.801469, 90.370461', '01652562126', 'hatil@gmail.com', '510', 'Furniture', 'Bijoy', 0, 1, '2020-11-21 01:21:54'),
(6, 'taVIhCePEjS3OJF', 'Binary Solution2', 'Mirpur 10', '5113131, 32132131', '01631695645', 'disystem@gmail.com', '50', 'software firm', 'sifaat', 1, 1, '2020-11-24 06:05:28'),
(7, 'veUdt4mMg2SXdDa', 'Binary Solution', 'Mirpur 10', '5113131, 32132131', '01631695645', 'disystem@gmail.com', '500', 'software', 'sifaat', 0, 0, '2020-11-24 07:22:06'),
(8, '4BLJ72MD3annnrH', 'Test Com New', 'Mirpur Senpara', '23.801469, 90.370461', '01652562126', 'hatil@gmail.com', '50', 'Furniture', 'Ashik', 1, 1, '2020-11-25 15:36:12');

-- --------------------------------------------------------

--
-- Table structure for table `company_temp`
--

CREATE TABLE `company_temp` (
  `id` int(11) NOT NULL,
  `com_code` text NOT NULL,
  `com_name` text NOT NULL,
  `com_address` text NOT NULL,
  `com_latlong` text NOT NULL,
  `user_ref_id` text NOT NULL,
  `com_mobile` text NOT NULL,
  `com_email` text NOT NULL,
  `com_size` text NOT NULL,
  `com_type` text NOT NULL,
  `com_contact_person` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_temp`
--

INSERT INTO `company_temp` (`id`, `com_code`, `com_name`, `com_address`, `com_latlong`, `user_ref_id`, `com_mobile`, `com_email`, `com_size`, `com_type`, `com_contact_person`, `create_date`) VALUES
(6, 'it9azyVVg1XU1G1', 'Binary Solution', 'Mirpur 10', '5113131, 32132131', '7UBaXvoHNgMP4Gf1qugPhWIta', '01631695645', 'disystem@gmail.com', '50', 'software firm', 'sifaat', '2020-11-25 18:35:51'),
(7, 'MByyaee77nQ3zts', 'iSolution', 'Mirpur 10', '5113131, 32132131', '7UBaXvoHNgMP4Gf1qugPhWIta', '01631695645', 'disystem@gmail.com', '50', 'software firm', 'sifaat', '2020-11-25 18:36:01'),
(8, 'xnyFKWzhzttiwsg', 'Swap Tech', 'Mirpur 10', '5113131, 32132131', '7UBaXvoHNgMP4Gf1qugPhWIta', '01631695645', 'disystem@gmail.com', '50', 'software firm', 'sifaat', '2020-11-25 18:36:08'),
(9, 'XmM7bsb6g4cXteF', 'Sv Solution', 'Mirpur 10', '5113131, 32132131', '7UBaXvoHNgMP4Gf1qugPhWIta', '01631695645', 'disystem@gmail.com', '50', 'software firm', 'sifaat', '2020-11-25 18:36:19'),
(10, 'ZrXHGuSbJ6QpVQJ', 'iCenter', 'Mirpur 10', '5113131, 32132131', '7UBaXvoHNgMP4Gf1qugPhWIta', '01631695645', 'disystem@gmail.com', '50', 'software firm', 'sifaat', '2020-11-25 18:36:24');

-- --------------------------------------------------------

--
-- Table structure for table `deal_assignment`
--

CREATE TABLE `deal_assignment` (
  `id` int(11) NOT NULL,
  `com_code` text NOT NULL,
  `deal_code` text NOT NULL,
  `assigned_by` text NOT NULL,
  `assigned_to` text NOT NULL,
  `assigned_to_name` text NOT NULL,
  `assignment_serial` int(11) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `deal_assignment`
--

INSERT INTO `deal_assignment` (`id`, `com_code`, `deal_code`, `assigned_by`, `assigned_to`, `assigned_to_name`, `assignment_serial`, `create_date`) VALUES
(1, 'SACMBx7Zt5MEmWX', 'qs4cxBMgAGLbl2Y', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'Aashiqur Rahman', 1, '2020-11-21 06:36:50'),
(2, 'SACMBx7Zt5MEmWX', 'sKAtJO1pB8qImcK', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'Aashiqur Rahman', 1, '2020-11-21 07:15:08'),
(3, 'SACMBx7Zt5MEmWX', 'sKAtJO1pB8qImcK', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'Xu9zT1nz8UW3aZ423E285PpDf', 'DI System', 2, '2020-11-21 07:15:08');

-- --------------------------------------------------------

--
-- Table structure for table `deal_info`
--

CREATE TABLE `deal_info` (
  `id` int(11) NOT NULL,
  `deal_code` text NOT NULL,
  `deal_name` text NOT NULL,
  `deal_desc` text NOT NULL,
  `deal_amount` double NOT NULL,
  `deal_stage` text NOT NULL,
  `deal_close_date` datetime NOT NULL,
  `deal_progress` text NOT NULL,
  `deal_type` text NOT NULL,
  `deal_owner` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deal_info`
--

INSERT INTO `deal_info` (`id`, `deal_code`, `deal_name`, `deal_desc`, `deal_amount`, `deal_stage`, `deal_close_date`, `deal_progress`, `deal_type`, `deal_owner`, `create_date`, `update_date`) VALUES
(1, 'qs4cxBMgAGLbl2Y', 'Test deal', 'deal desc yes I will be there at the same time I ', 50000, 'Presentation Scheduled', '2020-11-24 12:00:00', '0', 'new', 'YFNUDd5vJPiOS8LrQPs9pM2ok', '2020-11-21 06:36:50', '2020-11-21 06:36:50'),
(2, 'sKAtJO1pB8qImcK', 'Tt', 'hchhx', 600, 'Qualified to buy', '2020-11-22 12:00:00', '0', 'new', 'YFNUDd5vJPiOS8LrQPs9pM2ok', '2020-11-21 07:15:08', '2020-11-21 07:15:08');

-- --------------------------------------------------------

--
-- Table structure for table `dept_info`
--

CREATE TABLE `dept_info` (
  `id` int(11) NOT NULL,
  `dept_code` text NOT NULL,
  `dept_name` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dept_info`
--

INSERT INTO `dept_info` (`id`, `dept_code`, `dept_name`, `create_date`) VALUES
(11, 'nEbzF7tSTbdYK0l', 'Intern Dot net', '2020-11-24 07:01:30');

-- --------------------------------------------------------

--
-- Table structure for table `emp_tree`
--

CREATE TABLE `emp_tree` (
  `id` int(11) NOT NULL,
  `com_code` text NOT NULL,
  `user_id` text NOT NULL,
  `user_name` text NOT NULL,
  `parent_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp_tree`
--

INSERT INTO `emp_tree` (`id`, `com_code`, `user_id`, `user_name`, `parent_id`) VALUES
(10, 'SACMBx7Zt5MEmWX', 'TAm39o0l4GslcUG4QDycCZh7I', 'Mēhēdī Hāsāna', 'root'),
(11, 'SACMBx7Zt5MEmWX', 'tnUZWYnjx6KGyxbWLxJ5Fhl1n', 'Ashikur Rahman', 'TAm39o0l4GslcUG4QDycCZh7I'),
(12, 'SACMBx7Zt5MEmWX', '1y1ZVOmOr4WpqhE7Rxn8oBs32', 'Aashiqur Rahman', 'tnUZWYnjx6KGyxbWLxJ5Fhl1n');

-- --------------------------------------------------------

--
-- Table structure for table `location_history`
--

CREATE TABLE `location_history` (
  `id` int(11) NOT NULL,
  `com_code` text NOT NULL,
  `user_id` text NOT NULL,
  `user_latlong` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task_code` text NOT NULL,
  `task_title` text NOT NULL,
  `task_type` text NOT NULL,
  `task_date` datetime NOT NULL,
  `queue_code` text NOT NULL,
  `task_owner` text NOT NULL,
  `status` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task_code`, `task_title`, `task_type`, `task_date`, `queue_code`, `task_owner`, `status`, `create_date`, `update_date`) VALUES
(1, 'gTkNceQzOOfgnCG', 'Test task', 'call', '2020-11-23 12:00:00', 'queue_code', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'pending', '2020-11-21 06:28:01', '2020-11-21 06:28:01'),
(2, 'ozy6jKhez6LGkSk', 'Task2', 'email', '2020-11-23 12:00:00', 'queue_code', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'pending', '2020-11-21 06:28:50', '2020-11-21 06:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `tasks_details`
--

CREATE TABLE `tasks_details` (
  `id` int(11) NOT NULL,
  `task_code` text NOT NULL,
  `link_code` text NOT NULL,
  `link_type` text NOT NULL,
  `link_name` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks_details`
--

INSERT INTO `tasks_details` (`id`, `task_code`, `link_code`, `link_type`, `link_name`, `create_date`, `update_date`) VALUES
(1, 'gTkNceQzOOfgnCG', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'owner', 'Aashiqur Rahman', '2020-11-21 06:28:01', '2020-11-21 06:28:01'),
(2, 'gTkNceQzOOfgnCG', 'SACMBx7Zt5MEmWX', 'company', 'DI System', '2020-11-21 06:28:02', '2020-11-21 06:28:02'),
(3, 'ozy6jKhez6LGkSk', 'YFNUDd5vJPiOS8LrQPs9pM2ok', 'owner', 'Aashiqur Rahman', '2020-11-21 06:28:50', '2020-11-21 06:28:50'),
(4, 'ozy6jKhez6LGkSk', 'Y7kHONjhtKGzMzt', 'company', 'Hatil', '2020-11-21 06:28:51', '2020-11-21 06:28:51');

-- --------------------------------------------------------

--
-- Table structure for table `tree_adj`
--

CREATE TABLE `tree_adj` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tree_adj`
--

INSERT INTO `tree_adj` (`id`, `parent_id`, `title`) VALUES
(1, NULL, ''),
(2, 1, 'bin'),
(3, 1, 'etc'),
(4, 1, 'home'),
(5, 1, 'tmp'),
(6, 1, 'usr'),
(7, 1, 'var'),
(8, 3, 'apache2'),
(9, 3, 'apt'),
(10, 3, 'mysql'),
(11, 8, 'conf-available'),
(12, 8, 'mods-available'),
(13, 8, 'sites-available'),
(14, 4, 'roland'),
(15, 4, 'albert'),
(16, 6, 'bin'),
(17, 6, 'src'),
(18, 6, 'share'),
(19, 7, 'backups'),
(20, 7, 'cache'),
(21, 7, 'www'),
(22, 21, 'project1'),
(23, 22, 'app'),
(24, 22, 'log'),
(25, 22, 'vendor'),
(26, 22, 'public'),
(27, 25, 'bin'),
(28, 25, 'composer');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `user_name` text NOT NULL,
  `com_code` text NOT NULL,
  `com_name` text NOT NULL,
  `dept_code` text NOT NULL,
  `dept_name` text NOT NULL,
  `user_number` text NOT NULL,
  `address_home` text NOT NULL,
  `home_latlong` text NOT NULL,
  `address_office` text NOT NULL,
  `office_latlong` text NOT NULL,
  `app_key` text NOT NULL,
  `user_email` text NOT NULL,
  `user_id` text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `user_name`, `com_code`, `com_name`, `dept_code`, `dept_name`, `user_number`, `address_home`, `home_latlong`, `address_office`, `office_latlong`, `app_key`, `user_email`, `user_id`, `create_date`, `update_date`) VALUES
(1, 'Aashiqur Rahman', 'SACMBx7Zt5MEmWX', 'DI System', 'oHGuFBwKX5DNpND', 'Software Engineer', '', '', '', '', '', '3379900398772804', 'ashiku96@gmail.com', 'YFNUDd5vJPiOS8LrQPs9pM2ok', '2020-11-21 06:18:42', '2020-11-21 06:26:25'),
(2, '', 'SACMBx7Zt5MEmWX', 'DI System', 'BhNMPhUaPWKTjUC', 'DevOps Engineer', '', '', '', '', '', '103973215703262739806', 'disystemltd@gmail.com', 'Xu9zT1nz8UW3aZ423E285PpDf', '2020-11-21 07:12:28', '2020-11-22 05:05:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment_child`
--
ALTER TABLE `comment_child`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_central`
--
ALTER TABLE `company_central`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_temp`
--
ALTER TABLE `company_temp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deal_assignment`
--
ALTER TABLE `deal_assignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deal_info`
--
ALTER TABLE `deal_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dept_info`
--
ALTER TABLE `dept_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emp_tree`
--
ALTER TABLE `emp_tree`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location_history`
--
ALTER TABLE `location_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks_details`
--
ALTER TABLE `tasks_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tree_adj`
--
ALTER TABLE `tree_adj`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment_child`
--
ALTER TABLE `comment_child`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_central`
--
ALTER TABLE `company_central`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `company_temp`
--
ALTER TABLE `company_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `deal_assignment`
--
ALTER TABLE `deal_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `deal_info`
--
ALTER TABLE `deal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dept_info`
--
ALTER TABLE `dept_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `emp_tree`
--
ALTER TABLE `emp_tree`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `location_history`
--
ALTER TABLE `location_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tasks_details`
--
ALTER TABLE `tasks_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tree_adj`
--
ALTER TABLE `tree_adj`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tree_adj`
--
ALTER TABLE `tree_adj`
  ADD CONSTRAINT `tree_adj_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `tree_adj` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
