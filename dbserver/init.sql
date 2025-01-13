# Cancellazione di un database
DROP DATABASE dbapp IF EXISTS;

# Creo un nuovo database
CREATE DATABASE dbapp;

# CREATE DATABASE db1;

# CREATE DATABASE db2;

# Seleziono il database nel quale creare le tabelle
USE dbapp;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(30),
    cognome VARCHAR(30),
    indirizzo VARCHAR(50),
    cap CHAR(5),
    citta VARCHAR(50),
    provincia CHAR(2),
    telefono VARCHAR(20),
    cell VARCHAR(20),
    mail VARCHAR(100),
    username VARCHAR(20) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE logs (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    event VARCHAR(200),
    eventtime TIMESTAMP
);

CREATE TABLE ordini (
    login TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_user INT NOT NULL,
    data DATE NOT NULL,
    totale DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id)
    code VARCHAR(20)
    );

CREATE TABLE Spedizione(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_Ordine INT NOT NULL,
    data DATE NOT NULL,
    indirizzo VARCHAR(50),
    citta VARCHAR(50),
    stato CHAR(2),
);

CREATE TABLE Supporto (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_Ordine INT NOT NULL,
    codiceOrdine VARCHAR(20) NOT NULL,
    descrizione VARCHAR(200) NOT NULL,
    dataSpedizione DATE NOT NULL,
    dataRicezione DATE NOT NULL,
    numeroSupporto INT NOT NULL,
);

INSERT INTO users (username, password) VALUES ('admin', 'cisco');
INSERT INTO logs (event, eventtime) VALUES ('DB init', NOW());