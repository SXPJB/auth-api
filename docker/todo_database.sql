drop database if exists todo_app;
create database todo_app;
use todo_app;

create table if not exists catalog(
  id int primary key auto_increment,
  catalog varchar(100) not null,
  code varchar(100) not null,
  description varchar(255) not null,
  unique key (catalog, code)
);
/* initial record for catalog = Gender  F = Female, M = Male */
insert into catalog(catalog, code, description) VALUE ('c_gender', 'M', 'Male');
insert into catalog(catalog, code, description) VALUE ('c_gender', 'F', 'Male');
/* initial records for catalog todo status*/
insert into catalog(catalog, code, description) VALUE ('c_todo_status', 'P', 'Pending');
insert into catalog(catalog, code, description) VALUE ('c_todo_status', 'I', 'In Progress');
insert into catalog(catalog, code, description) VALUE ('c_todo_status', 'D', 'Done');


create table if not exists person(
    id int primary key auto_increment,
    first_name varchar(80) not null,
    last_name varchar(80) not null,
    email varchar(80) not null,
    id_gender int not null,
    active tinyint(1) not null default 1,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    foreign key (id_gender) references catalog(id),
    unique key (email)
);

create table if not exists user(
    id int primary key auto_increment,
    id_person int not null,
    username varchar(80) not null,
    password varchar(80) not null,
    token varchar(255),
    is_confirmed tinyint(1) not null default 0,
    confirmation_code varchar(255),
    confirmation_code_expires timestamp,
    active tinyint(1) not null default 1,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    foreign key (id_person) references person(id),
    unique key (id_person),
    unique key (username),
    unique key (token)
);


create table if not exists todo(
    id int primary key auto_increment,
    id_user int not null,
    title varchar(255) not null,
    description varchar(255) not null,
    id_status int not null,
    active tinyint(1) not null default 1,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    foreign key (id_user) references user(id),
    foreign key (id_status) references catalog(id)
);
