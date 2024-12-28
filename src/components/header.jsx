import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { logout } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  const { loading , fn: fnLogout } = useFetch(logout);


  useEffect(() => {
    console.log("User data in Header:", user);
  }, [user]);
  

  return (
    <div>
      <nav className='py-4 flex justify-between items-center mx-auto'>
        <Link to="/">
          <img src="/logo.png" className='h-36' alt="ZippyURL Logo" />
        </Link>
        <div>
          {
            !user ? (
              <Button onClick={() => navigate("/auth")} >Login</Button>
            )  : (
                <DropdownMenu>
                  <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                    <Avatar>
                      <AvatarImage src={user?.user_metadata?.user_metadata?.profile_pic} className="object-contain" />
                      <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.user_metadata?.user_metadata?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                      <Link to="/dashboard" className='flex'>
                      <DropdownMenuItem>
                          <LinkIcon className='mr-2 h-4 w-4' />
                          My Links</DropdownMenuItem>
                      </Link>
                    <DropdownMenuItem className='text-red-500' >
                      <LogOut className='mr-2 h-4 w-4' />
                      <span 
                      onClick={() => {
                        fnLogout().then(() =>(
                          fetchUser(),
                          navigate("/")
                        ));
                      }} >Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              )
          }
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#474E93" />}
    </div>
  );
};

export default Header;



