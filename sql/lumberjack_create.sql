--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5

-- Started on 2022-10-13 19:16:40 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16385)
-- Name: lumberjack; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA lumberjack;


ALTER SCHEMA lumberjack OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16428)
-- Name: messages; Type: TABLE; Schema: lumberjack; Owner: postgres
--

CREATE TABLE lumberjack.messages (
    id integer NOT NULL,
    user_id character(16) NOT NULL,
    project character(16) NOT NULL,
    message text,
    date timestamp with time zone NOT NULL,
    time_worked real
);


ALTER TABLE lumberjack.messages OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16427)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: lumberjack; Owner: postgres
--

CREATE SEQUENCE lumberjack.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE lumberjack.messages_id_seq OWNER TO postgres;

--
-- TOC entry 3323 (class 0 OID 0)
-- Dependencies: 211
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: lumberjack; Owner: postgres
--

ALTER SEQUENCE lumberjack.messages_id_seq OWNED BY lumberjack.messages.id;


--
-- TOC entry 210 (class 1259 OID 16422)
-- Name: users; Type: TABLE; Schema: lumberjack; Owner: postgres
--

CREATE TABLE lumberjack.users (
    id character(16) NOT NULL,
    user_name character(50) NOT NULL,
    display_name character(50),
    email character(50)
);


ALTER TABLE lumberjack.users OWNER TO postgres;

--
-- TOC entry 3172 (class 2604 OID 16431)
-- Name: messages id; Type: DEFAULT; Schema: lumberjack; Owner: postgres
--

ALTER TABLE ONLY lumberjack.messages ALTER COLUMN id SET DEFAULT nextval('lumberjack.messages_id_seq'::regclass);


--
-- TOC entry 3177 (class 2606 OID 16435)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: lumberjack; Owner: postgres
--

ALTER TABLE ONLY lumberjack.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3174 (class 2606 OID 16426)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: lumberjack; Owner: postgres
--

ALTER TABLE ONLY lumberjack.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3175 (class 1259 OID 16441)
-- Name: fki_users_fkey; Type: INDEX; Schema: lumberjack; Owner: postgres
--

CREATE INDEX fki_users_fkey ON lumberjack.messages USING btree (user_id);


--
-- TOC entry 3178 (class 2606 OID 16436)
-- Name: messages users_fkey; Type: FK CONSTRAINT; Schema: lumberjack; Owner: postgres
--

ALTER TABLE ONLY lumberjack.messages
    ADD CONSTRAINT users_fkey FOREIGN KEY (user_id) REFERENCES lumberjack.users(id) NOT VALID;


-- Completed on 2022-10-13 19:16:40 UTC

--
-- PostgreSQL database dump complete
--
