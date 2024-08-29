"use client";

import { useCallback, useEffect, useState } from 'react';
import { booking, deleteBooking } from '@/components/actions';
import { useRouter } from 'next/navigation';

import styles from './Yurts.module.css';
import { getSortedBookingsWithGuestNames } from './sorted';

interface BookingWithGuestName {
  booking_id: number;
  yurt_id: number;
  guest_name: string;
  guest_id: number;
  day: number;
  duration: number;
  extra_names: string;
}


interface Yurt {
  id: number;
  name: string;
  num_using_fri: number;
  num_using_sat: number;
}

interface BookingFormProps {
  user: any;
  yurt_list: Yurt[];
}

export default function BookingForm({ user, yurt_list }: BookingFormProps) {

  const router = useRouter();

  const [guestId, setGuestId] = useState<number | null>(null);
  const [stayDuration, setStayDuration] = useState<1 | 2 | null>(null);
  const [selectedYurtIndex, setSelectedYurtIndex] = useState<number | null>(null);
  const [selectedYurtId, setSelectedYurtId] = useState<number | null>(null);
  const [selectedYurtName, setSelectedYurtName] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<4 | 5 | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<number>(1);
  const [showPopup, setShowPopup] = useState(false);
  const [sortedBookings, setSortedBookings] = useState<BookingWithGuestName[]>([]);

  useEffect(() => {
    const getNumber = localStorage.getItem('guestId');
    if (getNumber === null) {
      alert('Please RSVP first');
      return;
    }
    const guestIdNum = parseInt(getNumber.match(/\d+$/)?.[0] ?? "", 10);
    setGuestId(guestIdNum);
  }, []);

  useEffect(() => {
    async function fetchAndSetBookings() {
      const bookings = await getSortedBookingsWithGuestNames();
      if (bookings) {
        setSortedBookings(bookings);
      }
    }
    fetchAndSetBookings();
  }, []);

  const handleDeleteBooking = async (bookingId: number) => {
    if (guestId === null) {
      alert('Please RSVP first');
      return;
    }
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      const redirectPath = await deleteBooking(bookingId);
      window.location.href = redirectPath;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (stayDuration === null) {
      handleDurationPopup();
      return;
    }
    if (selectedYurtIndex === null) {
      alert('Please select a yurt');
      return;
    }

    if (guestId === null) {
      alert('Please RSVP first');
      return;
    } else if (selectedYurtId === null) {
      alert('Please select a yurt');
      return;
    } else if (selectedPeople === 0) {
      alert('Please select a number of people');
      return;
    } else if (selectedColumn === null) {
      return;
    } else if (stayDuration === null) {
      alert('Please select a duration');
      return;
    } else {
      alert(`${selectedYurtName} selected for ${getStayDurationString()} for ${selectedPeople} person(s)`);

      formData.set('guest_id', guestId.toString());
      formData.set('yurt_id', selectedYurtId.toString());
      formData.set('num_guests', selectedPeople.toString());
      formData.set('day', selectedColumn.toString() ?? '');
      formData.set('duration', stayDuration.toString());
      formData.set('extra_names', formData.get('extra_names') ?? '');

      const returnPath = await booking(formData);
      window.location.href = returnPath;
    }
  };

  const handleDurationPopup = useCallback(() => {
    setShowPopup(true);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const handleYurtClick = useCallback((index: number, column: 4 | 5) => {
    const yurt = yurt_list.find(yurt => yurt.id === index + 1);
    if (stayDuration === null) {
      handleDurationPopup();
    } else if (yurt === undefined) {
      alert('Yurt not found');
    } else {
      const occupants = column === 4 ? yurt.num_using_fri : yurt.num_using_sat;
      const newOccupancy = occupants + selectedPeople;

      if (newOccupancy > 10) {
        alert('This yurt is already at maximum capacity. Please choose another yurt.');
        return;
      }

      setSelectedYurtIndex(index);
      setSelectedYurtId(index + 1);
      setSelectedColumn(column);
      setSelectedYurtName(yurt.name);
    }
  }, [stayDuration, yurt_list, handleDurationPopup, selectedPeople]);

  const handleDurationClick = useCallback((duration: 1 | 2) => {
    setStayDuration(duration);
    setSelectedYurtIndex(null); // Reset the selected yurt when switching duration
    setSelectedColumn(null);
    closePopup(); // Close the popup after selecting duration
  }, [closePopup]);

  const handlePeopleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeople(Number(event.target.value)); // Update selected quantity of people
  }, []);

  const getStayDurationString = useCallback(() => {
    if (stayDuration === 1) {
      return 'One Night';
    } else if (stayDuration === 2) {
      return 'Two Nights';
    } else {
      return '';
    }
  }, [stayDuration]);

  const naturalSort = (a: Yurt, b: Yurt) => {
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  };

  const sortedYurtList = [...yurt_list].sort(naturalSort);

  const getGuestNamesForYurt = (yurtId: number, day: number) => {
    return sortedBookings
      .filter(booking => booking.yurt_id === yurtId && (booking.duration == 2 || booking.day === day))
      .map(booking => {
        let names = [booking.guest_name];
        if (booking.extra_names) {
          names = names.concat(booking.extra_names.split(',').map(name => name.trim()));
        }
        return names.join(', ');
      })
      .join(', ');
  };

  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yurt Booking</h1>

      {sortedBookings.filter((booking) => booking.guest_id === guestId).length > 0 && (
        <div>
          
          <h2 className={styles.subtitle}>Your Bookings: </h2>
          <ul className={styles.list}>
            {sortedBookings
              .filter((booking) => booking.guest_id === guestId)
              .map((booking) => (
                <li key={booking.yurt_id}>
                  {booking.guest_name} booked Yurt {booking.yurt_id} for {booking.duration} night(s).
                  <button className={styles.button} onClick={() => handleDeleteBooking(booking.booking_id)}>Delete</button>
                </li>
              ))}
          </ul>
        </div>
      )}

      <div>
        <button
          onClick={() => handleDurationClick(1)}
          className={`${styles.button} ${stayDuration === 1 ? styles.buttonSelected : ''}`}
          style={{ backgroundColor: stayDuration === 1 ? '#953D38' : '#81A0AA' }}
        >One Night</button>
        <button
          onClick={() => handleDurationClick(2)}
          className={`${styles.button} ${stayDuration === 2 ? styles.buttonSelected : ''}`}
          style={{ backgroundColor: stayDuration === 2 ? '#953D38' : '#81A0AA' }}
        >Two Nights</button>
        <select value={selectedPeople} onChange={handlePeopleChange} className={styles.dropdown}>
          <option value={1}>1 Person</option>
          <option value={2}>2 People</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        {selectedPeople === 2 && (
          <input
            type="text"
            name="extra_names"
            placeholder="Extra Name"
            className={styles.inputField}
          />
        )}
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      <div className={styles.yurtsContainer}>
        <div className={styles.column}>
          <h3 className={styles.subtitle}>Friday</h3>
          {sortedYurtList.slice(0, 10).map((yurt, index) => (
            <div
              key={yurt.id}
              onClick={() => yurt.num_using_fri < 10 ? handleYurtClick(index, 4) : null}
              className={`${styles.yurt} 
                ${(stayDuration === 1 && selectedColumn === 4 && selectedYurtIndex === index) ||
                  (stayDuration === 2 && selectedYurtIndex === index)
                  ? styles.yurtSelected
                  : ''}
                ${yurt.num_using_fri >= 10 ? styles.yurtFullyOccupied : ''}`}
            >
              <h4>{yurt.name}</h4>
              <p>Number Using: {yurt.num_using_fri}</p>
              <div>Guests: {getGuestNamesForYurt(yurt.id, 4)}</div>
              {yurt.num_using_fri >= 10 && <p className={styles.fullyOccupiedText}>FULL</p>}
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <h3 className={styles.subtitle}>Saturday</h3>
          {sortedYurtList.slice(0, 10).map((yurt, index) => (
            <div
              key={yurt.id}
              onClick={() => yurt.num_using_sat < 10 ? handleYurtClick(index, 5) : null}
              className={`${styles.yurt} 
                ${(stayDuration === 1 && selectedColumn === 5 && selectedYurtIndex === index) ||
                  (stayDuration === 2 && selectedYurtIndex === index)
                  ? styles.yurtSelected
                  : ''}
                ${yurt.num_using_sat >= 10 ? styles.yurtFullyOccupied : ''}`}
            >
              <h4>{yurt.name}</h4>
              <p>Number Using: {yurt.num_using_sat}</p>
              <div>Guests: {getGuestNamesForYurt(yurt.id, 5)}</div>
              {yurt.num_using_sat >= 10 && <p className={styles.fullyOccupiedText}>FULL</p>}
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button onClick={closePopup}>Please select a duration</button>
          </div>
        </div>
      )}
    </div>
  );
}
