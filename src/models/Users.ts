/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, UserLogin } from '../interfaces/Users';
import { getConnection } from '../config/db';
import { BadRequestError } from '../errors/BadRequestError';

class Users {
  findAll = async () => {
    const sql = `
      SELECT * FROM users LIMIT 10
      `;
    let connection;
    try {
      connection = await getConnection();
      return (await connection.query(sql)) as User[];
    } catch (error: any) {
      throw new BadRequestError('Failed to retrieve user info!');
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  findByUsername = async (username: string): Promise<UserLogin[]> => {
    const sql = `
    SELECT
    U.id,
    U.staff_id,
    SR.id AS staff_registration_id,
    U.staff_position_id,
    U.staff_location_id,
    U.staff_type,
    SR.school_id,
    U.names,
    U.phone_number,
    U.email,
    U.password,
    U.ussd_pin,
    L.code AS location_code,
    L.name AS location_name,
    E.full_name AS school_name,
    E.code AS school_code,
    SR.created_at
    FROM
    users U
    LEFT JOIN (
    SELECT 
    staff_id, 
    school_id,
    id,
    MAX(created_at) AS created_at 
    FROM 
    staff_registration
    WHERE
    status IN ('EXISTING', 'NEW', 'STUDY_LEAVE')
    GROUP BY 
    staff_id,
    school_id
    ) AS SR ON U.staff_id = SR.staff_id
    LEFT JOIN
    location L ON U.staff_location_id = L.id
    LEFT JOIN
    entity E ON SR.school_id = E.id
    WHERE
    U.phone_number = ?
    ORDER BY SR.created_at DESC
    LIMIT 1
  `;
    let connection;
    try {
      connection = await getConnection();
      return await connection.query(sql, [username]);
    } catch (error: any) {
      throw new BadRequestError('Failed to retrieve user info!');
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  findById = async (id: string): Promise<UserLogin[]> => {
    const sql = `
    SELECT
    U.id,
    U.staff_id,
    SR.id AS staff_registration_id,
    U.staff_position_id,
    U.staff_location_id,
    U.staff_type,
    SR.school_id,
    U.names,
    U.phone_number,
    U.email,
    U.password,
    U.ussd_pin,
    L.code AS location_code,
    L.name AS location_name,
    E.full_name AS school_name,
    E.code AS school_code,
    SR.created_at
    FROM
    users U
    LEFT JOIN (
    SELECT 
    staff_id, 
    school_id,
    id,
    MAX(created_at) AS created_at 
    FROM 
    staff_registration
    WHERE
    status IN ('EXISTING', 'NEW', 'STUDY_LEAVE')
    GROUP BY 
    staff_id,
    school_id
    ) AS SR ON U.staff_id = SR.staff_id
    LEFT JOIN
    location L ON U.staff_location_id = L.id
    LEFT JOIN
    entity E ON SR.school_id = E.id
    WHERE
    U.id=?
    ORDER BY SR.created_at DESC
    LIMIT 1
    `;
    let connection;
    try {
      connection = await getConnection();
      return await connection.query(sql, [id]);
    } catch (error: any) {
      throw new BadRequestError('Failed to retrieve user info!');
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}
export default new Users();
