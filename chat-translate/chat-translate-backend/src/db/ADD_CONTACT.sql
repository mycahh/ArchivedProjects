DELIMITER // 

CREATE PROCEDURE add_contact(pID_user_adding INT, pID_user_added INT)
operacion:BEGIN
    DECLARE isExistContact INT;
    DECLARE vID_room INT;

    START TRANSACTION;
        IF pID_user_adding = pID_user_added THEN
            SELECT "error" as status_code, "No se puede agregar a si mismo." AS mensaje;
            LEAVE operacion;
        END IF;

        SELECT id INTO isExistContact 
        FROM contacts WHERE id_user_adding = pID_user_adding AND id_user_added = pID_user_added;

        IF isExistContact IS NOT NULL THEN
            SELECT "error" as status_code, "Este contacto ya existe." AS mensaje; 
            LEAVE operacion;
        END IF;

        INSERT INTO rooms VALUES();

        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SELECT "error" as status_code, "No se pudo crear el room" AS mensaje;
            LEAVE operacion;
        END IF;

        SET vID_room = LAST_INSERT_ID();

        INSERT INTO contacts(id_user_adding, id_user_added, id_room) 
        VALUES (pID_user_adding, pID_user_added, vID_room);

        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SELECT "error" as status_code, "No se pudo insertar el contacto" AS mensaje;
            LEAVE operacion;
        END IF;

        INSERT INTO participants(id_room, id_user)
        VALUES (vID_room, pID_user_adding), (vID_room, pID_user_added);

         IF ROW_COUNT() != 2 THEN
            ROLLBACK;
            SELECT "error" as status_code, "No se pudo añadir los participantes" AS mensaje;
            LEAVE operacion;
        END IF;
        
        COMMIT;
        SELECT "ok" as status_code, vID_room as id_room;
END //