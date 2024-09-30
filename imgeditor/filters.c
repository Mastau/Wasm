/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   filters.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: thomarna <thomarna@42angouleme.fr>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/09/29 09:18:07 by thomarna          #+#    #+#             */
/*   Updated: 2024/09/30 03:35:19 by thomarna         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdint.h>

void	ft_grayscale(uint8_t *imgData, int width, int height)
{
	int		i;
	int		length;
	uint8_t	gray;

	i = 0;
	length = width * height * 4;
	while (i < length)
	{
		gray = (imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3;
		imgData[i] = gray;
		imgData[i + 1] = gray;
		imgData[i + 2] = gray;
		i += 4;
	};
}

void	ft_invert(uint8_t *imgData, int width, int height)
{
	int	i;
	int	length;

	i = 0;
	length = width * height * 4;
	while (i < length)
	{
		imgData[i] = 255 - imgData[i];
		imgData[i + 1] = 255 - imgData[i + 1];
		imgData[i + 2] = 255 - imgData[i + 2];
		i += 4;
	}
}
