create schema blog;
create table blog.post(
    id serial primary key,
    tittle text not null,
    content text not null,
    date timestamp default now()
);

insert into blog.post (tittle,content) values ('REST API: Introdução', '...');

select * from blog.post