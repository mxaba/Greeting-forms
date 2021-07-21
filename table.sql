DROP TABLE IF EXISTS greetings;

create table greetings (
    id serial not null,
    names text not null,
    english int not null,
    spanish int not null,
    isizulu int not null,
    counts int not null
);

